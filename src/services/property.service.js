const connection = require('../app/database')
class PropertyService {
  // 修改物业信息
  async updateProperty(remark, status, fees, createtime, endtime, id) {
    const sql = `update property set remark = ? , status = ?, fees = ? , createtime = ? , endtime = ? where id = ? ; `
    await connection.execute(sql, [remark, status, fees, createtime, endtime, id])
  }
  // 获取物业列表
  async getProperty(realname, offset = 0, size = 10) {
    if (realname) {
      const sql = `
			select  property.id, property.remark,property.fees,property.status,property.createtime,property.endtime,
			JSON_OBJECT('id',home.id,'position',home.position) home,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from property 
			left join home on home_id = home.id 
			left join user on user_id = user.id 
			where realname like ?
			limit ?,?
			`

      const sql1 = `
			select count(*) total
			from property 
			left join home on home_id = home.id 
			left join user on user_id = user.id 
			where realname like ?
			`
      const [res] = await connection.execute(sql, [`%${realname}%`, offset, size])
      console.log(res)
      const [res1] = await connection.execute(sql1, [`%${realname}%`])
      return { propertyList: res, total: res1[0].total }
    } else {
      const sql = `
			select  property.id, property.remark,property.fees,property.status,property.createtime,property.endtime,
			JSON_OBJECT('id',home.id,'position',home.position) home,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from property 
			left join home on home_id = home.id 
			left join user on user_id = user.id 
			limit ?,?
			`
      const sql1 = `
			select count(*) total
			from property 
			`
      const [res] = await connection.execute(sql, [offset, size])
      const [res1] = await connection.execute(sql1)
      return { propertyList: res, total: res1[0].total }
    }
  }
}

module.exports = new PropertyService()
