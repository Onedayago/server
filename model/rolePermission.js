
import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const rolePermissionSchema = new Schema({
  roleId:{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },

  permissionId: {
    type: Schema.Types.ObjectId,
    ref: 'Permission'
  },
})



const RolePermission = mongoose.model('RolePermission', rolePermissionSchema);

export default RolePermission
