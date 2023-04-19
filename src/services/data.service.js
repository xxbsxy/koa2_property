const connection = require('../app/database')
class DataService {
  async getDataList() {
    // 用户数量
    const sql = `select count(*) user_num  from user ;`
    const [[{ user_num }]] = await connection.execute(sql)
    // 房屋数量
    const sql15 = `select count(*) home_num  from home ;`
    const [[{ home_num }]] = await connection.execute(sql15)
    // 房屋数量
    const sql16 = `select count(*) car_num  from car ;`
    const [[{ car_num }]] = await connection.execute(sql16)
    // 投诉
    const sql1 = `select count(*) complaint_num   from complaint;`
    const [[{ complaint_num }]] = await connection.execute(sql1)
    const sql2 = `select count(*) complaint_not_num  from complaint where status = '未处理';`
    const [[{ complaint_not_num }]] = await connection.execute(sql2)
    const sql3 = `select count(*) complaint_go_num  from complaint where status = '处理中';`
    const [[{ complaint_go_num }]] = await connection.execute(sql3)
    const sql4 = `select count(*) complaint_suc_num  from complaint where status = '已处理';`
    const [[{ complaint_suc_num }]] = await connection.execute(sql4)
    // 报修
    const sql5 = `select count(*) repair_num  from repair;`
    const [[{ repair_num }]] = await connection.execute(sql5)
    const sql6 = `select count(*) repair_not_num  from repair where status = '未处理';`
    const [[{ repair_not_num }]] = await connection.execute(sql6)
    const sql7 = `select count(*) repair_go_num  from repair where status = '处理中';`
    const [[{ repair_go_num }]] = await connection.execute(sql7)
    const sql8 = `select count(*) repair_suc_num  from repair where status = '已处理';`
    const [[{ repair_suc_num }]] = await connection.execute(sql8)
    // 水电费
    const sql9 = `select count(*) power_num  from power;`
    const [[{ power_num }]] = await connection.execute(sql9)
    const sql10 = `select count(*) power_not_num  from power where status = '未缴费';`
    const [[{ power_not_num }]] = await connection.execute(sql10)
    const sql11 = `select count(*) power_suc_num  from repair where status = '已缴费';`
    const [[{ power_suc_num }]] = await connection.execute(sql11)
    // 物业费
    const sql12 = `select count(*) property_num  from property;`
    const [[{ property_num }]] = await connection.execute(sql12)
    const sql13 = `select count(*) property_not_num  from property where status = '未缴费';`
    const [[{ property_not_num }]] = await connection.execute(sql13)
    const sql14 = `select count(*) property_suc_num  from property where status = '已缴费';`
    const [[{ property_suc_num }]] = await connection.execute(sql14)
    return {
      userList: { user_num },
      homeList: { home_num },
      carList: { car_num },
      complaintList: { complaint_num, complaint_not_num, complaint_go_num, complaint_suc_num },
      repairList: { repair_num, repair_not_num, repair_go_num, repair_suc_num },
      powerList: { power_num, power_not_num, power_suc_num },
      propertyList: { property_num, property_not_num, property_suc_num }
    }
  }
}

module.exports = new DataService()
