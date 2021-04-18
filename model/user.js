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
  },
  sort: {
    type: Number
  }
})



const User = mongoose.model('User', userSchema);


User.findOne({
  username: 'liushun',
}).then((res)=>{

  if(!res){
    new User({
      username: 'liushun',
      password: '123456',
      isAdmin: true,
      sort: 1
    }).save()
  }

}).catch(()=>{

})




export default User
