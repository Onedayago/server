import Joi from 'joi'

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

export const addMenuSchema = Joi.object({
  name: Joi.string().required(),
  route: Joi.string().required(),
  parentId: Joi.string(),
  isMenu: Joi.bool().required(),
  sort: Joi.number().required()
})

export const addUserSchema = Joi.object({
  roleId: Joi.string().required(),
  isAdmin: Joi.boolean().allow(null),
  username: Joi.string().required(),
  password: Joi.string().required(),
  sort: Joi.number().required()

})

export const deleteUserSchema = Joi.object({
  userId: Joi.string().required()
})

export const deleteMenuSchema = Joi.object({
  _id: Joi.string().required(),
})

export  const addRoleSchema = Joi.object({
  roleName: Joi.string().required(),
  roleDes: Joi.string(),
  permissionId: Joi.array(),
  sort: Joi.number().required()
})

export  const editRoleSchema = Joi.object({
  roleName: Joi.string().required(),
  roleDes: Joi.string(),
  permissionId: Joi.array(),
  sort: Joi.number().required(),
  _id: Joi.string().required()
})

export  const getRolePermission = Joi.object({
  _id: Joi.string().required()
})

export const deleteRoleSchema = Joi.object({
  _id: Joi.string().required(),
})


export const updateMenuSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  route: Joi.string().required(),
  sort: Joi.number().required(),
})

export const editUserSchema = Joi.object({
  roleId: Joi.string().required(),
  userId: Joi.string().required(),
  isAdmin: Joi.boolean().allow(null),
  username: Joi.string().required(),
  password: Joi.string().required(),
  sort: Joi.number().required()
})
