import express from 'express'
import {Message} from '../util/message'
import {ERROR} from '../util/error'
import {SUCCESS} from '../util/success'
import User from '../model/user'
import Permission from '../model/permission'
import UserRole from '../model/userRole'
import rolePermission from '../model/rolePermission'
import mongoose from 'mongoose'
import * as Check from '../constant/verification'
import * as Token from '../util/token'
import {auth} from '../middleware/auth'

const router = express.Router();

/**
 * 登录
 * */
router.post('/login', async function (req, res, next) {

  const {username, password} = req.body;

  try {

    const {error} = Check.loginSchema.validate({username, password});

    if (error) {
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    } else {

      let useRes = await User.findOne({username})

      if(useRes){

        if(password === useRes.password){

          const {username, _id, isAdmin, avatar} = useRes


          const token = await Token.sign({
            username: useRes.username,
            _id: useRes._id
          })

          let menu = []

          if(isAdmin){
            menu =await Permission.find()
          }else{
            let {roleId} = await UserRole.findOne({userId: useRes._id})

            let temp = await rolePermission.find({roleId}).populate('permissionId').exec()

            temp.forEach((item)=>{
              menu.push(item.permissionId)
            })

          }


          let userData = {
            token,
            username,
            _id,
            isAdmin,
            avatar,
            menu
          }


          res.json(Message(SUCCESS.loginSuccess.code, SUCCESS.loginSuccess.msg, userData))
        }else{
          res.json(Message(ERROR.PassError.code, ERROR.PassError.msg))
        }

      }else{
        res.json(Message(ERROR.NoUser.code, ERROR.NoUser.msg))
      }

    }

  } catch (e) {
    console.log(e.toString())
    res.json(Message(ERROR.loginError.code, ERROR.loginError.msg))
  }

});


/**
 * 添加用户
 * */
router.post('/addUser',auth, async function (req, res, next) {

  const {roleId, username, password, isAdmin, sort} = req.body

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const {error} = Check.addUserSchema.validate({roleId, username, password, isAdmin, sort});

    if (error) {
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    } else {


      const usesRes = await new User({
        username,
        password,
        isAdmin,
        sort
      }).save({session})

      await new UserRole({
        userId: usesRes._id,
        roleId
      }).save({session})

      await session.commitTransaction();

      res.json(Message(SUCCESS.AddUserSuccess.code, SUCCESS.AddUserSuccess.msg))

    }

  } catch (e) {
    await session.abortTransaction();
    res.json(Message(ERROR.AddUserError.code, ERROR.AddUserError.msg))
  }

  session.endSession();

})


/**
 * 删除用户
 * */
router.delete('/deleteUser', auth, async function (req, res, next) {

  const {userId} = req.body

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const {error} = Check.deleteUserSchema.validate({userId});

    if (error) {
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    } else {

      await User.deleteMany({
        _id: userId,
      },{
        session
      })

      await UserRole.deleteMany({
        userId
      },{
        session
      })


      await session.commitTransaction();

      res.json(Message(SUCCESS.DeleteUserSuccess.code, SUCCESS.DeleteUserSuccess.msg))

    }

  } catch (e) {
    await session.abortTransaction();
    res.json(Message(ERROR.DeleteUserError.code, ERROR.DeleteUserError.msg))
  }

  session.endSession();

})

/**
 * 获取所有用户
 * */
router.post('/getUser', auth, async function (req, res, next) {

  try {
    const userRes = await UserRole.find().populate('userId').exec()

    let result = []

    userRes.forEach((item)=>{
      let temp = {}
      temp.roleId = item.roleId
      temp.isAdmin = item.userId.isAdmin
      temp.username = item.userId.username
      temp.password = item.userId.password
      temp.sort = item.userId.sort
      temp._id = item.userId._id

      result.push(temp)
    })

    res.json(Message(SUCCESS.GetUserSuccess.code, SUCCESS.GetUserSuccess.msg, result))
  } catch (e) {
    console.log(e.toString())
    res.json(Message(ERROR.GetUserError.code, ERROR.GetUserError.msg))
  }

})



router.patch('/editUser', auth, async function (req, res, next) {

  const {userId, roleId, isAdmin, username, password, sort} = req.body

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const {error} = Check.editUserSchema.validate({userId, roleId, isAdmin, username, password, sort})

    if(error){
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    }else{

      User.updateOne({_id: userId}, {
        roleId,
        isAdmin,
        username,
        password,
        sort
      },{session})


      await UserRole.updateOne({userId}, {
        roleId
      },{session})
    }

    await session.commitTransaction();
    res.json(Message(SUCCESS.EditUserSuccess.code, SUCCESS.EditUserSuccess.msg))
  }catch (e) {
    console.log(e.toString())
    await session.abortTransaction();
    res.json(Message(ERROR.EditUserError.code, ERROR.EditUserError.msg))
  }

  session.endSession();

})



export default router
