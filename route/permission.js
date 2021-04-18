import { Message} from "../util/message";
import {ERROR} from '../util/error'
import {SUCCESS} from '../util/success'
import Permission from "../model/permission";
import express from "express";
import * as Check from '../constant/verification'
import {auth} from '../middleware/auth'

const router = express.Router();



/**
 * 添加菜单
 * */

router.post('/addMenu', auth,  async function (req, res, next) {

  const {name, route, parentId, isMenu, sort} = req.body;


  try {

    const {error} = Check.addMenuSchema.validate({name, route, parentId, isMenu, sort});

    if (error) {
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    } else {

      await new Permission({
        name,
        route,
        parentId,
        isMenu,
        sort
      }).save()

      res.json(Message(SUCCESS.AddMenuSuccess.code, SUCCESS.AddMenuSuccess.msg))

    }

  } catch (e) {
    res.json(Message(ERROR.AddMenuError.code, ERROR.AddMenuError.msg))
  }

})

/**
 * 获取所有菜单
 * */

router.post('/getMenu', auth, async function (req, res, next) {

  try {
    const menuRes = await Permission.find({isMenu: true}).sort({sort: 1})

    res.json(Message(SUCCESS.GetMenuSuccess.code, SUCCESS.GetMenuSuccess.msg, menuRes))

  }catch (e) {

  }

})



/**
 * 删除菜单
 * */
router.delete('/deleteMenu', auth, async function (req, res, next) {
  const {_id} = req.body;
  try {
    const {error} = Check.deleteMenuSchema.validate({_id});

    if (error) {
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    } else {

      const hasChildren = await Permission.find({parentId: _id})

      if(hasChildren.length!==0){
        res.json(Message(ERROR.DeleteMenuError.code, ERROR.DeleteMenuError.msg))
      }else{
        await Permission.deleteOne({_id})
        res.json(Message(SUCCESS.DeleteMenuSuccess.code, SUCCESS.DeleteMenuSuccess.msg))
      }

    }

  } catch (e) {
    res.json(Message(ERROR.DeleteMenuError.code, ERROR.DeleteMenuError.msg))
  }

})


/**
 * 修改菜单
 * */


router.patch('/updateMenu', auth, async function (req, res, next) {

  const {_id, name, route, sort} = req.body;

  try {
    const {error} = Check.updateMenuSchema.validate({_id, name, route, sort});

    if (error) {
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    } else {

      await Permission.findByIdAndUpdate(_id,{name, route, sort})
      res.json(Message(SUCCESS.UpdateMenuSuccess.code, SUCCESS.UpdateMenuSuccess.msg))

    }

  } catch (e) {
    console.log(e.toString())
    res.json(Message(ERROR.UpdateMenuError.code, ERROR.UpdateMenuError.msg))
  }

})



export default router
