import { Message} from "../util/message";
import {ERROR} from '../util/error'
import {SUCCESS} from '../util/success'
import Role from "../model/role";
import RolePermission from "../model/rolePermission";
import express from "express";
import * as Check from '../constant/verification'
import mongoose from "mongoose";
import {auth} from '../middleware/auth'

const router = express.Router();


/**
 * 添加角色
 * */

router.post('/addRole', auth, async function (req, res, next) {

  const {roleName, roleDes, permissionId, sort} = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const {error} = Check.addRoleSchema.validate({roleName, roleDes, permissionId, sort});
    if (error) {
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    } else {

      const roleRes = await new Role({roleName, roleDes, sort}).save({session})

      for(let i=0; i<permissionId.length;i++){
        await new RolePermission({roleId: roleRes._id, permissionId: permissionId[i]}).save({session})
      }

      await session.commitTransaction();
      res.json(Message(SUCCESS.AddRoleSuccess.code, SUCCESS.AddRoleSuccess.msg))
    }

  } catch (e) {
    await session.abortTransaction();
    res.json(Message(ERROR.AddRoleError.code, ERROR.AddRoleError.msg))
  }

  session.endSession();

})


/**
 * 编辑角色
 * */

router.patch('/editRole', auth, async function (req, res, next) {

  const {roleName, roleDes, permissionId, sort, _id} = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const {error} = Check.editRoleSchema.validate({roleName, roleDes, permissionId, sort, _id});
    if (error) {
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    } else {

      await Role.updateOne({_id},{
        roleName,
        roleDes,
        sort
      },{session})


      await RolePermission.deleteMany({roleId: _id},{session})


      if(permissionId){
        for(let i=0; i<permissionId.length;i++){
          await new RolePermission({roleId: _id, permissionId: permissionId[i]}).save({session})
        }
      }


      await session.commitTransaction();
      res.json(Message(SUCCESS.EditRoleSuccess.code, SUCCESS.EditRoleSuccess.msg))
    }

  } catch (e) {
    console.log(e.toString())
    await session.abortTransaction();
    res.json(Message(ERROR.EditRoleError.code, ERROR.EditRoleError.msg))
  }

  session.endSession();

})

/**
 * 获取所有角色
 * */

router.post('/getRole', auth, async function (req, res, next) {

  try {
    const roleRes = await Role.find().sort({sort: 1})

    res.json(Message(SUCCESS.GetRoleSuccess.code, SUCCESS.GetRoleSuccess.msg, roleRes))
  } catch (e) {

  }

})

/**
 * 获取角色的路由
 * */

router.post('/getRolePermission', auth, async function (req, res, next) {

  const {_id} = req.body

  try {

    const {error} = Check.getRolePermission.validate({_id})

    if(error){
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    }else {
      const roleRes = await RolePermission.find({roleId: _id})

      res.json(Message(SUCCESS.GetRolePermissionSuccess.code, SUCCESS.GetRolePermissionSuccess.msg, roleRes))
    }

  } catch (e) {

  }

})

/**
 * 删除角色
 * */


router.delete('/deleteRole', auth, async function (req, res, next) {

  const {_id} = req.body

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const {error} = Check.deleteRoleSchema.validate({_id});

    if(error){
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    }else{
      await Role.deleteMany({_id})
      await RolePermission.deleteMany({roleId: _id})

      await session.commitTransaction();
      res.json(Message(SUCCESS.DeleteRoleSuccess.code, SUCCESS.DeleteRoleSuccess.msg))
    }

  }catch (e) {
    await session.abortTransaction();
    res.json(Message(ERROR.DeleteRoleError.code, ERROR.DeleteRoleError.msg))
  }
  session.endSession();
})


export default router
