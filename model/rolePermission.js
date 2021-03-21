
import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const rolePermissionSchema = new Schema({
  roleId:{
    type: String,
  },

  permissionId: {
    type: String
  },
})



const RolePermission = mongoose.model('RolePermission', rolePermissionSchema);

export default RolePermission
