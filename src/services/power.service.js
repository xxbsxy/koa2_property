const connection = require('../app/database')
class PowerService {
  // 修改物业信息
  async updatePower(remark, status, water_fees, electric_fees, gas_fees, createtime, endtime, id) {
    console.log(remark, status, water_fees, electric_fees, gas_fees, createtime, endtime, id)
    const sql = `update power set remark = ? , status = ?, water_fees = ?, electric_fees = ?,gas_fees = ?, createtime = ? , endtime = ? where id = ? ; `
    await connection.execute(sql, [
      remark,
      status,
      water_fees,
      electric_fees,
      gas_fees,
      createtime,
      endtime,
      id
    ])
  }
  async updatePowerStatus(id) {
    const sql = `update power set  status = ?  where id = ? ; `
    await connection.execute(sql, ['已缴费', id])
  }
  // 获取水电列表
  async getPower(realname, offset = 0, size = 10) {
    if (realname) {
      const sql = `
			select  power.id, power.remark,power.water_fees,power.electric_fees,power.gas_fees,power.status,power.createtime,power.endtime,
			JSON_OBJECT('id',home.id,'position',home.position) home,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from power 
			left join home on home_id = home.id 
			left join user on user_id = user.id 
			where realname like ?
			limit ?,?
			`

      const sql1 = `
			select count(*) total
			from power 
			left join home on home_id = home.id 
			left join user on user_id = user.id 
			where realname like ?
			`
      const [res] = await connection.execute(sql, [`%${realname}%`, offset, size])
      const [res1] = await connection.execute(sql1, [`%${realname}%`])
      return { powerList: res, total: res1[0].total }
    } else {
      const sql = `
			select  power.id, power.remark,power.water_fees,power.electric_fees,power.gas_fees,power.status,power.createtime,power.endtime,
			JSON_OBJECT('id',home.id,'position',home.position) home,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from power 
			left join home on home_id = home.id 
			left join user on user_id = user.id 
			limit ?,?
			`
      const sql1 = `
			select count(*) total
			from power 
			`
      const [res] = await connection.execute(sql, [offset, size])
      const [res1] = await connection.execute(sql1)
      return { powerList: res, total: res1[0].total }
    }
  }
}

module.exports = new PowerService()
