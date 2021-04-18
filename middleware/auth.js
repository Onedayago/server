import * as Token from '../util/token'
import {Message} from "../util/message";
import {ERROR} from "../util/error";


export async function auth(req, res, next) {

  const token = req.get('token')


  try {

    const res = await Token.verify(token)

    if(res){
      next()
    }else{
      res.json(Message(ERROR.NoAuth.code, ERROR.NoAuth.msg))
    }
  } catch (e) {
    res.json(Message(ERROR.NoAuth.code, ERROR.NoAuth.msg))
  }

}
