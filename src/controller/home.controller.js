const HomeService = require('../services/home.service')
const HandelRes = require('../utils/handle-result')

class HomeControler {
  // 获取全部房子
  async getHome(ctx, next) {
    const { realname, offset = 0, size = 10 } = ctx.query
    try {
      const res = await HomeService.getHome(realname, String(offset), String(size))
      ctx.body = {
        data: res,
        code: 200
      }
    } catch (error) {
      HandelRes.error(ctx, '获取房间列表失败')
    }
  }
  // 添加一个房子
  async addHome(ctx, next) {
    const { area, des, position, type } = ctx.request.body
    try {
      await HomeService.addHome(area, des, position, type)
      HandelRes.success(ctx, '添加房屋成功', 201)
    } catch (error) {
      HandelRes.error(ctx, '添加房屋失败')
    }
  }
  // 删除一个房子
  async deleteHome(ctx, next) {
    const { id } = ctx.params
    try {
      await HomeService.deleteHome(id)
      HandelRes.success(ctx, '删除房屋成功')
    } catch (error) {
      HandelRes.error(ctx, '删除房屋失败')
    }
  }
  // 更新一个房屋
  async updateHome(ctx, next) {
    const { area, des, position, type } = ctx.request.body
    const { id } = ctx.params
    try {
      await HomeService.updateHome(area, des, position, type, id)
      HandelRes.success(ctx, '更新房屋成功')
    } catch (error) {
      HandelRes.error(ctx, '更新房屋失败')
    }
  }
  // 获取单个用户的房屋
  async getHomeById(ctx, next) {
    const { id } = ctx.params
    const { offset = 0, size = 10 } = ctx.query
    try {
      const res = await HomeService.getHomeById(id, String(offset), String(size))
      ctx.body = {
        data: res,
        code: 200
      }
    } catch (error) {
      HandelRes.error(ctx, '获取房屋失败')
    }
  }
}
module.exports = new HomeControler()
