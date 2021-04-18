import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }
})



const UserRole = mongoose.model('UserRole', userRoleSchema);

export default UserRole
