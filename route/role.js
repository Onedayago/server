import Joi from "joi";
import {ERROR, Message, SUCCESS} from "../util/message";
import Role from "../model/role";
import RolePermission from "../model/rolePermission";
import express from "express";

const router = express.Router();

const addRoleSchema = Joi.object({
  roleName: Joi.string().required(),
  roleDes: Joi.string(),
  permissionId: Joi.array(),
  sort: Joi.number().required()
})

/**
 * 添加角色
 * */

router.post('/addRole', async function (req, res, next) {

  const {roleName, roleDes, permissionId, sort} = req.body;

  try {

    const {error} = addRoleSchema.validate({roleName, roleDes, permissionId, sort});
    if (error) {
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    } else {

      const roleRes = await new Role({roleName, roleDes, sort}).save()

      permissionId.forEach(async (item) => {
        await new RolePermission({roleId: roleRes._id, permissionId: item}).save()
      })


      res.json(Message(SUCCESS.AddRoleSuccess.code, SUCCESS.AddRoleSuccess.msg))
    }

  } catch (e) {
    console.log(e.toString())
    res.json(Message(ERROR.AddRoleError.code, ERROR.AddRoleError.msg))
  }

})

/**
 * 获取角色
 * */

router.post('/getRole', async function (req, res, next) {

  try {
    const roleRes = await Role.find()

    res.json(Message(SUCCESS.GetRoleSuccess.code, SUCCESS.GetRoleSuccess.msg, roleRes))

  } catch (e) {

  }

})

/**
 * 获取角色的路由
 * */

router.post('/getRolePermission', async function (req, res, next) {

  const {_id} = req.body

  try {

    const roleRes = await RolePermission.find({roleId: _id})

    res.json(Message(SUCCESS.GetRolePermissionSuccess.code, SUCCESS.GetRolePermissionSuccess.msg, roleRes))

  } catch (e) {

  }

})

/**
 * 删除角色
 * */

const deleteRoleSchema = Joi.object({
  _id: Joi.string().required(),
})

router.delete('/deleteRole',async function (req, res, next) {

  const {_id} = req.body
  try {

    const {error} = deleteRoleSchema.validate({_id});

    if(error){
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    }else{
      await Role.deleteMany({_id})
      await RolePermission.deleteMany({roleId: _id})

      res.json(Message(SUCCESS.DeleteRoleSuccess.code, SUCCESS.DeleteRoleSuccess.msg))
    }

  }catch (e) {
    res.json(Message(ERROR.DeleteRoleError.code, ERROR.DeleteRoleError.msg))
  }
})


export default router
