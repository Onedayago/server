import jwt from 'jsonwebtoken'


const key = 'dafafdfsdsf'


export async function sign(data) {

  try {
    const res = await jwt.sign(data, key)
    return  res
  }catch (e) {

  }

}

export async function verify(token) {


  try {
    const res = await jwt.verify(token, key)
    return res
  } catch (e) {

  }

}
