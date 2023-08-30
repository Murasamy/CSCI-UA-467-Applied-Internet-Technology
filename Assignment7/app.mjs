// app.mjs
import express from 'express';
const app = express();
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/hw07');
try {
    await mongoose.connect('mongodb://localhost/hw07', { useNewUrlParser: true });
    console.log('Successfully connected to database.');
} catch (err) {
    console.log('ERROR: ', err);
}

// to parse json bodies, uncomment the following line:
// app.use(express.json())

import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // to parse json bodies
import apiRouter from './routes/api.mjs'; // import the router
app.use('/api', apiRouter); // use the router

app.listen(3000, () => {
    console.log('Server started on port 3000');
});


