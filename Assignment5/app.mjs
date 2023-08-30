import express from 'express';
import Review from './db.mjs';
// import mongoose from 'mongoose';

const app = express();

// set up express static
import url from 'url';
import path from 'path';
import crypto from 'crypto';
import session from 'express-session';

function generateId() {
  return crypto.randomBytes(16).toString('hex');
}


const sessionOptions = {
  // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: generateId(),
  resave: false,
  saveUninitialized: false,
};

app.use(session(sessionOptions));


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
// none
// configure templating to hbs
app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));

// app.get('/courseSearchForm', (req, res) => {
//   console.log("Get CourseSearchForm");
//   const semester = req.query.semester;
//   const year = req.query.year;
//   const professor = req.query.professor;

//   const queryFind = {};

//   if (semester) { queryFind.semester = semester; }
//   if (year) { queryFind.year = year; }
//   if (professor) { queryFind.professor = professor; }
//   console.log(queryFind);

//   Review.find(queryFind)
//   .then((reviews) => {
//     console.log("search rst");
//     console.log(reviews);
//     res.render("index", {reviews});
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// });

app.get('/reviews/add', (req, res) => {
  res.render('add');
});

app.post('/reviews/add', (req, res) => {
  res.render('add');

  if(req.body.courseNumber && req.body.courseName && req.body.semester && req.body.year && req.body.professor && req.body.review){
    const newReview = new Review({
      courseNumber: req.body.courseNumber,
      courseName: req.body.courseName,
      semester: req.body.semester,
      year: req.body.year,
      professor: req.body.professor,
      review: req.body.review
    });

    newReview.save()
    .then(res.redirect("/"))
    .catch(err => {console.log(err);});

  }else{
    res.redirect('/reviews/add');
  }

});

app.get('/', (req, res) => {
  console.log("Get CourseSearchForm");
  const semester = req.query.semester;
  const year = req.query.year;
  const professor = req.query.professor;

  const queryFind = {};

  if (semester) { queryFind.semester = semester; }
  if (year) { queryFind.year = year; }
  if (professor) { queryFind.professor = professor; }
  console.log(queryFind);

  Review.find(queryFind)
    .then((reviews) => {
      console.log("search rst");
      console.log(reviews);
      res.render("index", { reviews });
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(3000, () => { console.log('Server Started'); });