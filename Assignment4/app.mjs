// app.mjs
import express from 'express';
import url from 'url';
import path from 'path';
import { readFile } from 'fs';
import * as kaomoji from "./kaomoji.mjs";
import session from 'express-session';
import crypto from 'crypto';

function generateRandomKey() {
  return crypto.randomBytes(16).toString('hex');
}

const sessionOptions = {
    secret: generateRandomKey(),
    resave: true,
    saveUninitialized: true
};

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// console.log(__dirname);
const publicPath = path.resolve(__dirname, 'public');

const app = express();
app.use(session(sessionOptions));
const KaomojiList = [];

function word2Kaomoji(word) {
    for (let i = 0; i < KaomojiList.length; i++) {
        if (KaomojiList[i].isEmotion(word)) {
            return KaomojiList[i].value;
        }
    }
    return false;
}

app.set('view engine', 'hbs');

app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: false }));

// app.use(function (req, res, next) {
//     console.log('Method:', req.method);
//     console.log('Path:', req.path);
//     console.log('Query:', req.query);
//     console.log("====================================")
//     next();
// })

app.use(function(req, res, next) {
    console.log(`Method: ${req.method}`);
    console.log(`Route: ${req.path}`);
    console.log(`Query string: ${JSON.stringify(req.query)}`);
  
    // const cookies = req.headers.cookie || '';
    // const sidCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('connect.sid'));
  
    // if (sidCookie) {
    //   console.log(`Session ID: ${sidCookie.split('=')[1]}`);
    // }
  
    next();
  });

// app.use(function (req, res, next) {
//     console.log('req.method:', req.method, req.path);
//     console.log('req.query:', req.query);
//     console.log('req.body:', req.body);
//     // call next to invoke next middleware function or route handler
//     next();
// })

// app.use((req, res, next) => {
//     console.log(req.get("Host"))
//     if (req.get('Host')) {
//         next();
//     } else {
//         res.status(400).send('invalid request... add a host header plz');
//     }
// });

app.get("/img/logo.png", (req, res) => {
    res.sendFile("./public/img/logo.png");
    res.end();
});

app.get("/public/css/main.css", (req, res) => {
    const picPath = path.resolve(publicPath, 'img', "logo.png");
    // console.log("send file")
    // console.log(picPath)
    res.sendFile(picPath);
    res.end();
});

app.get("/", (req, res) => {
    res.redirect("/editor");
});

app.get("/editor", (req, res) => {
    // const picPath = path.resolve(publicPath, 'img', "logo.png");
    // console.log("editor==========");
    const editingBefore = (req.query.editor || "");
    console.log(editingBefore);
    const words = editingBefore.split(/\s+/);

    const cleanWords = words.map(word => word.replace(/[^\w\s]/gi, ''));

    // { KaomojiList: KaomojiList.filter(Kaomoji => Kaomoji.isEmotion(searchKaomoji)) }

    // const replacedList = cleanWords.filter(function(word){
    //     if (word2Kaomoji(word) !== false){
    //         console.log("-----replace------")
    //         console.log("return:"+word2Kaomoji(word))
    //         return word2Kaomoji(word);
    //     } else{
    //         return word;
    //     }
    // })
    // console.log(replacedList);

    let replacedList = [];
    for (let i = 0; i < cleanWords.length; i++) {
        const word = cleanWords[i];
        if (word2Kaomoji(word) !== false) {
            // console.log("-----replace------");
            // console.log("return:" + word2Kaomoji(word));
            replacedList.push(word2Kaomoji(word));
        } else {
            replacedList.push(word);
        }
    }

    replacedList = replacedList.join(" ");
    // console.log(replacedList)

    res.render("editor", { replacedList });
});

app.post('/layoutForm01', (req, res) => {
    // console.log("====================body");
    // console.log(req.body);
    // console.log("====================query");
    // console.log(req.query);
    res.redirect('/editor');
});

app.get("/stats", (req, res) => {
    if (!req.session.addCount) {
        req.session.addCount = 0;
    }

    const addCount = req.session.addCount;

    res.render("addCount", { addCount });
});

app.get("/dictionary", (req, res) => {

    const searchKaomoji = (req.query.emotion || "");
    // console.log(searchKaomoji === "")

    // const temp = KaomojiList.filter(Kaomoji => Kaomoji.isEmotion(searchKaomoji));
    // console.log(temp)
    // res.render("list", { KaomojiList })
    if (searchKaomoji === "") {
        res.render("list", { KaomojiList });
    } else {
        // const temp = KaomojiList.filter(Kaomoji => Kaomoji.isEmotion(searchKaomoji));
        // console.log(temp);
        res.render('list', { KaomojiList: KaomojiList.filter(Kaomoji => Kaomoji.isEmotion(searchKaomoji)) });
    }
});

app.post("/addEmotions", (req, res) => {

    if (!req.session.addCount) {
        req.session.addCount = 0;
    }

    if (!req.session.redirectCount) {
        // if not, set it to 1
        req.session.redirectCount = 1;
      } else {
        // if it exists, increment it
        req.session.redirectCount++;
      }

    console.log(req.body);
    const emotionsList = req.body.addEmotions.split(",");
    const emotionValue = req.body.addValue;
    // console.log("==========seq===========")
    // console.log(emotionsList, emotionValue);

    const Kaomoji = new kaomoji.Kaomoji(emotionValue, emotionsList);
    KaomojiList.push(Kaomoji);
    req.session.addCount++;
    // console.log(req.session["countAdd"])
    res.redirect("/dictionary");


});


// app.get('/listSearch', (req, res) => {
//     console.log("========================================")
//     console.log(req.query.kimojiSearch)
//     console.log("========================================")
//     const searchKaomoji = req.query.kimojiSearch
//     res.redirect('/directory')
// });

readFile("./code-samples/kaomojiData.json", "utf-8", (err, data) => {
    if (err) {throw err;}
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
        // console.log(data[i])
        const Kaomoji = new kaomoji.Kaomoji(data[i]["value"], data[i]["emotions"]);
        KaomojiList.push(Kaomoji);
    }

    app.listen(3000, () => {
        console.log(`Server started; type CTRL+C to shut down `);
    });
});

