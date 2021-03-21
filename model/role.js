
import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const roleSchema = new Schema({
  roleName:{
    type: String,
    unique: true
  },

  roleDes: {
    type: String,
    default: ""
  },

  sort: {
    type: Number,
  }
})



const Role = mongoose.model('Role', roleSchema);

export default Role
