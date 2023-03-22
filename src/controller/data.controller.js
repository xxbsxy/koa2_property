const DataService = require('../services/data.service')
const HandelRes = require('../utils/handle-result')
class DataController {
  // 获取物业列表
  async getDataList(ctx) {
    const res = await DataService.getDataList()
    ctx.body = {
      data: res,
      code: 200
    }
  }
}

module.exports = new DataController()
