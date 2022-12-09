const UserService = require('../services/user.service')
const HandelRes = require('../utils/handle-result')

class UserController {
  async addUser(ctx, next) {
    // 获取用户数据
    const { username, realname, sex, age, password, phone, role } = ctx.request.body
    // 向数据库添加用户
    try {
      await UserService.addUser(username, realname, sex, age, password, phone, role)
      HandelRes.success(ctx, '添加用户成功', 201)
    } catch (error) {
      HandelRes.error(ctx, '添加用户失败')
    }
  }

  async updateUser(ctx, next) {
    // 获取修改数据
    const { username, realname, sex, age, phone } = ctx.request.body
    const { userId } = ctx.params
    // 数据库更新用户
    try {
      await UserService.updateUser(userId, username, realname, sex, age, phone)
      HandelRes.success(ctx, '更新用户成功')
    } catch (error) {
      HandelRes.error(ctx, '更新用户失败')
    }
  }

  async deleteUser(ctx, next) {
    const { userId } = ctx.params
    try {
      await UserService.deleteUser(userId)
      HandelRes.success(ctx, '删除用户成功')
    } catch (error) {
      HandelRes.error(ctx, '删除用户失败')
    }
  }
  async getUserList(ctx, next) {
    const { offset = 0, size = 10 } = ctx.query
    try {
      const res = await UserService.getUserList(String(offset), String(size))
      const { total } = await UserService.getUserTotal()
      ctx.body = {
        data: {
          userList: res,
          total
        },
        code: 200
      }
    } catch (error) {
      HandelRes.error(ctx, '获取用户列表失败')
    }
  }
  async queryUser(ctx, next) {
    const { username } = ctx.params
    const res = await UserService.queryUser(username)
    ctx.body = {
      data: res,
      code: 200
    }
  }
}
module.exports = new UserController()
