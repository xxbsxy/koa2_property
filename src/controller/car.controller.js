const CarService = require('../services/car.service')
const HandelRes = require('../utils/handle-result')
class CarController {
  // 获取车位列表
  async getCarList(ctx) {
    const { realname, offset = 0, size = 10 } = ctx.query
    try {
      const res = await CarService.getCarList(realname, String(offset), String(size))
      ctx.body = {
        data: res,
        code: 200
      }
    } catch (error) {
      HandelRes.error(ctx, '获取车位列表失败')
    }
  }
  // 添加车位
  async addCar(ctx) {
    const { position, fees, area, remark, car_num, status } = ctx.request.body
    try {
      await CarService.addCar(position, Number(fees), area, remark, car_num, status)
      HandelRes.success(ctx, '添加车位成功', 201)
    } catch (error) {
      HandelRes.error(ctx, '添加车位失败')
    }
  }
  // 删除车位
  async deleteCar(ctx) {
    const { id } = ctx.params
    try {
      await CarService.deleteCar(id)
      HandelRes.success(ctx, '删除车位成功')
    } catch (error) {
      HandelRes.error(ctx, '删除车位失败')
    }
  }
  async updateCar(ctx) {
    const { position, fees, area, car_num, remark } = ctx.request.body
    const { id } = ctx.params
    try {
      await CarService.updateCar(position, fees, area, remark, car_num, id)
      HandelRes.success(ctx, '更新车位成功')
    } catch (error) {
      HandelRes.error(ctx, '更新车位失败')
    }
  }
}

module.exports = new CarController()
