import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const User = mongoose.model('User', userSchema);

(async () => {
  await mongoose.connect('mongodb://localhost/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const newUser = new User({
    name: 'John Doe',
    age: 25,
    email: 'johndoe@example.com'
  });

  await newUser.save();

  console.log('User saved to database:', newUser);

  await mongoose.disconnect();
})();