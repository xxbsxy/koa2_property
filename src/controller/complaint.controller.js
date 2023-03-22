const ComplaintService = require('../services/complaint.service')
const HandelRes = require('../utils/handle-result')
class ComplaintController {
  async addComplaint(ctx, next) {
    const { content, userId, remark, type } = ctx.request.body
    try {
      await ComplaintService.addComplaint(content, remark, type, userId)
      HandelRes.success(ctx, '添加投诉成功', 201)
    } catch (error) {
      HandelRes.error(ctx, '添加投诉失败')
    }
  }
  async updateComplaint(ctx, next) {
    const { content, status, remark, type, handle_user, handle_phone } = ctx.request.body
    const { id } = ctx.params
    try {
      await ComplaintService.updateComplaint(
        content,
        status,
        remark,
        type,
        handle_user,
        handle_phone,
        id
      )
      HandelRes.success(ctx, '更新投诉成功')
    } catch (error) {
      HandelRes.error(ctx, '更新投诉失败')
    }
  }
  async deleteComplaint(ctx, next) {
    const { id } = ctx.params
    try {
      await ComplaintService.deleteComplaint(id)
      HandelRes.success(ctx, '删除投诉成功')
    } catch (error) {
      HandelRes.error(ctx, '删除投诉失败')
    }
  }
  async getComplaintList(ctx, next) {
    const { realname, offset = 0, size = 10 } = ctx.query
    try {
      const res = await ComplaintService.getComplaintList(realname, String(offset), String(size))
      ctx.body = {
        data: res,
        code: 200
      }
    } catch (error) {
      HandelRes.error(ctx, '获取投诉列表失败')
    }
  }
  async getComplaintById(ctx, next) {
    const { id } = ctx.params
    const { offset = 0, size = 10 } = ctx.query
    try {
      const res = await ComplaintService.getComplaintById(id, String(offset), String(size))
      ctx.body = {
        data: res,
        code: 200
      }
    } catch (error) {
      HandelRes.error(ctx, '获取投诉失败')
    }
  }
}

module.exports = new ComplaintController()
