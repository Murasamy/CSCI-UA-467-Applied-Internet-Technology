import * as webLib from './web-lib.mjs';
import * as path from "path";
import * as fs from "fs";

import { fileURLToPath } from 'url';

// TODO: configure and start server


// class Request {
//     constructor(s) {
//         const [method, path, version, ...other] = s.split(' ');
//         this.path = path;
//         this.method = method;
//     }
// }
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const absPath = path.join(__dirname, 'config.json');
fs.readFile(absPath, "utf-8", function(error, data){

    if(error){console.log(error); return;}

    data = JSON.parse(data);
    const rootDirectory = data["root_directory"];
    const reDirectMap = data["redirect_map"];
    // console.log(rootDirectory);
    // console.log(reDirectMap);
    const fullPath = path.join(__dirname, "..", rootDirectory);
    console.log(fullPath);

    const myServer = new webLib.HTTPServer(fullPath, reDirectMap);
    myServer.listen(3000, '0.0.0.0');
});