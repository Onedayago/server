
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

  parentId: {     //父级id
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


Permission.findOne({
  name: '权限管理',
}).then(async (res) => {

  const session = await mongoose.startSession();
  session.startTransaction();

  if(!res){

    try {
      const perRes = await new Permission({
        name: '权限管理',
        route: 'manage',
        parentId: '',
        isMenu: true,
        sort: 1
      }).save({session})


      await new Permission({
        name: '菜单管理',
        route: 'manageMenu',
        parentId: perRes._id,
        isMenu: true,
        sort: 1
      }).save({session})

      await session.commitTransaction();
    }catch (e) {
      await session.abortTransaction();
    }



  }

  session.endSession();


})





export default Permission
