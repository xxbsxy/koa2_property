const RepairService = require('../services/repair.service')
const HandelRes = require('../utils/handle-result')
class ComplaintController {
  // 添加报修
  async addRepair(ctx, next) {
    const { content, place, remark, type, userId } = ctx.request.body
    try {
      await RepairService.addRepair(content, place, remark, type, userId)
      HandelRes.success(ctx, '添加报修成功', 201)
    } catch (error) {
      HandelRes.error(ctx, '添加报修失败')
    }
  }

  // 获取报修列表
  async getRepairList(ctx, next) {
    const { realname, offset = 0, size = 10 } = ctx.query
    try {
      const res = await RepairService.getRepairList(realname, String(offset), String(size))
      ctx.body = {
        data: res,
        code: 200
      }
    } catch (error) {
      HandelRes.error(ctx, '获取报修列表失败')
    }
  }

  // 删除报修
  async deleteRepair(ctx, next) {
    const { id } = ctx.params
    try {
      await RepairService.deleteRepair(id)
      HandelRes.success(ctx, '删除报修成功')
    } catch (error) {
      HandelRes.error(ctx, '删除报修失败')
    }
  }

  // 更新报修
  async updateRepair(ctx, next) {
    const { content, place, remark, type, status } = ctx.request.body
    const { id } = ctx.params
    try {
      await RepairService.updateRepair(content, place, status, remark, type, id)
      HandelRes.success(ctx, '更新报修成功')
    } catch (error) {
      console.log(error)
      HandelRes.error(ctx, '更新报修失败')
    }
  }

  // 获取用户的全部报修
  async getRepairById(ctx, next) {
    const { id } = ctx.params
    const { offset = 0, size = 10 } = ctx.query
    try {
      const res = await RepairService.getRepairById(id, String(offset), String(size))
      ctx.body = {
        data: res,
        code: 200
      }
    } catch (error) {
      HandelRes.error(ctx, '获取报修失败')
    }
  }
}
module.exports = new ComplaintController()
