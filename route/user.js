import express from 'express'
import Joi from 'joi'
import {Message, ERROR, SUCCESS} from '../util/message'
import User from '../model/user'


const router = express.Router();


const loginSchema = Joi.object({
  username: Joi.string().required().min(3).max(10),
  password: Joi.string().required()
})


/**
 * 登录
 * @param Sting username
 * @param String password
 * */

router.post('/login', async function (req, res, next) {

  const {username, password} = req.body;

  try {

    const {error} = loginSchema.validate({username, password});

    if (error) {
      res.json(Message(ERROR.ParamsError.code, error.details[0].message))
    } else {

      const useRes = await User.findOne({username})

      if(useRes){


        if(password === useRes.password){
          res.json(Message(SUCCESS.loginSuccess.code, SUCCESS.loginSuccess.msg, useRes))
        }else{
          res.json(Message(ERROR.PassError.code, ERROR.PassError.msg))
        }

      }else{
        res.json(Message(ERROR.NoUser.code, ERROR.NoUser.msg))
      }


    }

  } catch (e) {

  }


});



export default router
