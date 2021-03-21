

export const ERROR = {
  ParamsError: {
    code: 10000,
    msg: '参数错误'
  },
  NoUser: {
    code: 10001,
    msg: '没有该用户'
  },
  PassError: {
    code: 10002,
    msg: '密码错误'
  },
  AddMenuError: {
    code: 10003,
    msg: '菜单已存在'
  },
  DeleteMenuError: {
    code: 10004,
    msg: '删除菜单失败'
  },

  GetMenuError: {
    code: 10005,
    msg: '获取菜单失败'
  },

  UpdateMenuError: {
    code: 10006,
    msg: '编辑菜单失败 '
  },

  AddRoleError: {
    code: 10007,
    msg: '添加角色失败'
  },

  DeleteRoleError: {
    code: 10009,
    msg: '删除角色失败'
  },

  EditRoleError: {
    code: 10010,
    msg: '编辑角色失败'
  },

  GetRolePermissionError: {
    code: 100011,
    msg: '获取角色菜单失败'
  }

}

export const SUCCESS = {
  loginSuccess: {
    code: 20000,
    msg: '登录成功'
  },
  AddMenuSuccess: {
    code: 20001,
    msg: '添加菜单成功 '
  },

  DeleteMenuSuccess: {
    code: 20002,
    msg: '删除菜单成功'
  },

  GetMenuSuccess: {
    code: 20003,
    msg: '获取菜单成功'
  },

  UpdateMenuSuccess: {
    code: 20004,
    msg: '编辑菜单成功'
  },

  AddRoleSuccess: {
    code: 20005,
    msg: '添加角色成功'
  },

  GetRoleSuccess: {
    code: 20006,
    msg: '获取角色成功'
  },

  DeleteRoleSuccess: {
    code: 20007,
    msg: '删除角色成功'
  },

  EditRoleSuccess: {
    code: 20008,
    msg: '编辑角色成功'
  },

  GetRolePermissionSuccess: {
    code: 20009,
    msg: '获取角色菜单成功'
  }



}



export function Message(code = 0, msg = "", data = {}) {
  return{
    code,
    msg,
    data
  }
}
