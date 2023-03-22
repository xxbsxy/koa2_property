const PropertyService = require('../services/property.service')
const HandelRes = require('../utils/handle-result')
class PropertyController {
  // 获取物业列表
  async getProperty(ctx) {
    const { realname, offset = 0, size = 10 } = ctx.query
    try {
      const res = await PropertyService.getProperty(realname, String(offset), String(size))
      ctx.body = {
        data: res,
        code: 200
      }
    } catch (error) {
      console.log(error)
      HandelRes.error(ctx, '获取物业费信息失败')
    }
  }
  // 修改物业信息
  async updateProperty(ctx) {
    const { remark, status, fees, createtime, endtime } = ctx.request.body
    const { id } = ctx.params
    try {
      await PropertyService.updateProperty(remark, status, Number(fees), createtime, endtime, id)
      HandelRes.success(ctx, '更新物业信息成功')
    } catch (error) {
      HandelRes.error(ctx, '更新物业信息失败')
    }
  }
  async updatePropertyStatus(ctx) {
    const { id } = ctx.params
    try {
      await PropertyService.updatePropertyStatus(id)
      HandelRes.success(ctx, '缴费成功')
    } catch (error) {
      HandelRes.error(ctx, '缴费失败')
    }
  }
}

module.exports = new PropertyController()
