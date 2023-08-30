import * as path from "path";
import * as net from "net";
import * as fs from "fs";
import MarkdownIt from "markdown-it";

const MIME_TYPES = {
    "jpg": "image/jpg",
    "jpeg": "image/jpeg",
    "png": "image/png",
    "html": "text/html",
    "css": "text/css",
    "txt": "text/plain"
};

/**
 * returns the extension of a file name (for example, foo.md returns md)
 * @param fileName (String)
 * @return extension (String)
 */
function getExtension(fileName) {
    const formatPath = path.extname(fileName).toLowerCase();
    if (formatPath.startsWith(".")) {
        return formatPath.substring(1);
    }
    return formatPath;
}

/**
 * determines the type of file from a file's extension (for example,
 * foo.html returns text/html
 * @param: fileName (String)
 * @return: MIME type (String), undefined for unkwown MIME types
 */
function getMIMEType(fileName) {
    const ext = path.extname(fileName);
    return ext.length > 0 ? MIME_TYPES[ext.substring(1)] : null;
}

class Request {
    constructor(reqStr) {
        const [method, path] = reqStr.split(" ");
        this.method = method;
        this.path = path;
    }
}

class Response {

    static STATUS_CODES = {
        200: "OK",
        308: "Permanent Redirect",
        404: "Page Not Found",
        500: "Internal Server Error"
    };

    constructor(socket, statusCode = 200, version = "HTTP/1.1") {
        this.sock = socket;
        this.statusCode = statusCode;
        this.version = version;
        this.headers = {};
        this.body = null;

        // My change here:
        this.location = null;
    }

    setHeader(name, value) {
        this.headers[name] = value;
    }

    status(statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    send(body, newHeader = null) {
        this.body = body ?? "";

        if (!Object.hasOwn(this.headers, "Content-Type")) {
            this.headers["Content-Type"] = "text/html";
        }

        if (newHeader) {
            this.headers["Content-Type"] = newHeader;
        }

        const statusCodeDesc = Response.STATUS_CODES[this.statusCode];

        const headersString = Object.entries(this.headers).reduce((s, [name, value]) => {
            return s + `${name}: ${value} \r\n`;
        }, "");

        this.sock.write(`${this.version} ${this.statusCode} ${statusCodeDesc}\r\n`);
        if (this.location) {
            this.sock.write(`Location: ${this.location}\r\n`);
        }
        this.sock.write(`${headersString}\r\n`);

        this.sock.write(this.body);

        // console.log(`${this.version} ${this.statusCode} ${statusCodeDesc}`);
        // console.log(`${headersString}\r\n`);

        this.sock.end();
    }
}

class HTTPServer {
    constructor(rootDirFull, redirectMap) {
        this.rootDirFull = rootDirFull;
        this.redirectMap = redirectMap;
        this.server = net.createServer(this.handleConnection.bind(this));
    }

    listen(port, host) {
        this.server.listen(port, host);
    }

    handleConnection(sock) {
        sock.on("data", data => this.handleRequest(sock, data));
    }

    handleRequest(sock, binaryData) {
        const req = new Request(binaryData.toString());
        const res = new Response(sock);
        const reqPathFull = path.join(this.rootDirFull, req.path);

        console.log("Request from browser: " + req.path);
        console.log("Check if in the redirectMap: " + Object.hasOwn(this.redirectMap, req.path));

        if (Object.hasOwn(this.redirectMap, req.path)) {
            res.statusCode = 308;
            console.log("sending message");
            res.location = this.redirectMap[req.path];
            res.send("Nothing in this page");
        }

        const filePath = path.join(this.rootDirFull, req.path);
        const normalizedPath = path.normalize(filePath);
        // console.log("absolute path");
        // console.log(normalizedPath);
        // console.log("check start with");
        // console.log(normalizedPath.startsWith(this.rootDirFull));
        // console.log("Here is a normalized path:");
        // console.log(normalizedPath);
        // console.log(this.rootDirFull);
        // console.log(normalizedPath);
        // console.log(normalizedPath.startsWith(this.rootDirFull));

        if (normalizedPath.startsWith(this.rootDirFull)) {
            fs.access(reqPathFull, fs.constants.F_OK, (err) => {
                if (err) {
                    res.statusCode = 404;
                    res.send("No such file", "text/plain");
                } else {
                    // res.send("Reachable Page!");
                    console.log("Reachable Page!");

                    // changeable
                    s => {
                        const isDirectory = stats.isDirectory();
                        const isFile = stats.isFile();
                        console.log("isDirectory?" + isDirectory);
                        console.log("isFile" + isFile);
                        if (err) {
                            res.statusCode = 500;
                            res.send('Not a file or directory', "text/plain");
                            console.log(err);

                        } else if (stats.isFile()) {
                            // console.log("is File");
                            const fileExtension = getExtension(normalizedPath);
                            const fileType = getMIMEType(normalizedPath);
                            // console.log(fileExtension);
                            // console.log(fileType);

                            if (fileExtension === 'md') {
                                fs.readFile(normalizedPath, (err, data) => {
                                    if (err) {
                                        res.statusCode= 500;
                                        res.send("md file cannot read!", "text/plain");
                                    } else {
                                        const markdown = MarkdownIt({ html: true });
                                        const rendered = markdown.render(data.toString());
                                        res.send(rendered, "text/html");

                                    }
                                });
                            } else {
                                fs.readFile(normalizedPath, (err, data) => {
                                    if (err) {
                                        res.statusCode = 500;
                                        res.send("Error reading file");
                                    } else {
                                        console.log("send data, type: " + fileType);
                                        console.log(data);
                                        res.send(data, fileType);
                                    }
                                });
                            }

                        } else if (stats.isDirectory()) {
                            console.log("Recognize a dir");
                            fs.readdir(normalizedPath, { withFileTypes: true }, (err, files) => {
                                if (err) {
                                    res.statusCode = 500;
                                    res.send('Error reading directory', "text/plain");
                                } else {
                                    console.log(files);

                                    let html = '<html><body><ul>';
                                    files.forEach(file => {
                                        html += `<li><a href="${req.path}${file.name}${file.isDirectory() ? '/' : ''}">${file.name}${file.isDirectory() ? '/' : ''}</a></li>`;
                                    });
                                    html += '</ul></body></html>';
                                    res.send(html, "text/html");
                                }
                            });
                        }

                    });

                }
            });

        } else {
            console.log("not start with");
            res.statusCode = 404;
            res.send("Forbidden Access", "text/plain");

        }

        if (Object.hasOwn(this.redirectMap, req.path) === -1) {
            res.statusCode = 404;
            res.send("Forbidden Access");
            // res.send('not found');
        }







        // TODO: (see homework specification for details)
        // 0. implementation can start here, but other classes / methods can be modified or added
        // 1. handle redirects first
        // 2. if not a redirect and file/dir does not exist send back not found
        // 3. if file, serve file
        // 4. if dir, generate page that lists files and dirs contained in dir
        // 5. if markdown, compile and send back html\







    }
}

// const http = new HTTPServer("public", {
//     "/foo": "/index.html",
//     "/test": "/css/styles.css",
//     "/invalid": "/nonexist",
//     "/redirect1.html": "/redirect3.html"
// });


// app.get('/ramen.html', (req, res) => {
//     res.send('<h1>ramen ftw</h1>')
// })
// http.listen(3000, '0.0.0.0');



export {
    Request,
    Response,
    HTTPServer
};