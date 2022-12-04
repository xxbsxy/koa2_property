const UserService = require('../services/user.service')
const HandelRes = require('../utils/handle-result')

class UserController {
  async addUser(ctx, next) {
    // 获取用户数据
    const { username, realname, sex, age, password, phone, role } = ctx.request.body
    // 向数据库添加用户
    try {
      await UserService.addUser(username, realname, sex, age, password, phone, role)
      HandelRes.success(ctx, '添加成功', 201)
    } catch (error) {
      HandelRes.error(ctx, '添加失败')
    }
  }
  async updateUser(ctx, next) {
    const { username, realname, sex, age, password, phone, role } = ctx.request.body
    const { id } = ctx.params
  }
}
module.exports = new UserController()
