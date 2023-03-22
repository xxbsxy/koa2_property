const PowerService = require('../services/power.service')
const HandelRes = require('../utils/handle-result')
class PowerController {
  // 获取物业列表
  async getPower(ctx) {
    const { realname, offset = 0, size = 10 } = ctx.query
    try {
      const res = await PowerService.getPower(realname, String(offset), String(size))
      ctx.body = {
        data: res,
        code: 200
      }
    } catch (error) {
      console.log(error)
      HandelRes.error(ctx, '获取水电信息失败')
    }
  }
  // 修改水电信息
  async updatePower(ctx) {
    const { remark, status, water_fees, electric_fees, gas_fees, createtime, endtime } =
      ctx.request.body
    const { id } = ctx.params
    try {
      await PowerService.updatePower(
        remark,
        status,
        Number(water_fees),
        Number(electric_fees),
        Number(gas_fees),
        createtime,
        endtime,
        id
      )
      HandelRes.success(ctx, '更新水电信息成功')
    } catch (error) {
      HandelRes.error(ctx, '更新水电信息失败')
    }
  }
  async updatePowerStatus(ctx) {
    const { id } = ctx.params
    try {
      await PowerService.updatePowerStatus(id)
      HandelRes.success(ctx, '缴费成功')
    } catch (error) {
      HandelRes.error(ctx, '缴费失败')
    }
  }
}

module.exports = new PowerController()
