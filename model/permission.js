
import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  name: {
    type: String,
    unique: true
  },

  route: {      //前后端路由
    type: String
  },

  parentId: {     //如果是菜单，则有这个
    type: String,
    default: ""
  },

  isMenu: {
    type: Boolean,  //判断是否是菜单
    default: false
  },

  menuId: {      // 如果不是菜单则，新增的权限是在哪个菜单下
    type: String,
    default: ""
  },
  sort: {
    type: Number,
  }


})



const Permission = mongoose.model('Permission', permissionSchema);

export default Permission
