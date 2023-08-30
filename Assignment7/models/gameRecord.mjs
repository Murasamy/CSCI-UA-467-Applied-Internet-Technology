// import mongoose from 'mongoose'

// const UserRecordSchema = new mongoose.Schema({
//   username: {required: true, type: String},
//   userScore: {required: true, type: String},
//   computerScore: {required: true, type: Date}
// });

// const UserRecord = mongoose.model('UserRecord', UserRecordSchema)

// export default UserRecord
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  userInitials: {
    type: String,
    required: true
  },
  computerScore: {
    type: Number,
    required: true
  },
  userScore: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;