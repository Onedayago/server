import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: 'default.jpeg'
  }
})



const User = mongoose.model('User', userSchema);

export default User
