// const mongoose = require('mongoose');
import mongoose from 'mongoose';

// OPTIONAL: modify the connection code below if
// using mongodb authentication
const mongooseOpts = {
  useNewUrlParser: true,  
  useUnifiedTopology: true
};

// mongoose.connect('mongodb://localhost/hw05', mongooseOpts, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('connected to database'); 
//   }
// });

mongoose.connect('mongodb://localhost/hw05', mongooseOpts)
  .then(() => console.log('connected to database'))
  .catch((err) => console.log(err));

// TODO: create schema and register models

// my schema goes here!
const ReviewSchema = new mongoose.Schema({
  courseNumber: String,
  courseName: String,
  semester: String,
  year: Number,
  professor: String,
  review: String
});

// mongoose.model('Review', ReviewSchema);

const Review = mongoose.model('Review', ReviewSchema, 'reviews');

// const newUser = new Review({
//   courseNumber: "String",
//   courseName: "String",
//   semester: "String",
//   year: 2019,
//   professor: "String",
//   review: "String"
// });

// await newUser.save();

// Review.find({year: 2018}).then((review) => {console.log(review);});

export default Review;