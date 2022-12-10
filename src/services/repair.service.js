const connection = require('../app/database')

class RepairService {
  // 添加报修
  async addRepair(content, place, userId) {
    const sql = `insert into repair (content,place,user_id) values (?,?, ?)`
    await connection.execute(sql, [content, place, userId])
  }

  // 获取报修列表
  async getRepairList(realname, offset, size) {
    if (realname) {
      const sql = `
			select  repair.id, repair.content,repair.place, repair.status ,repair.createtime,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from repair 
			left join user on user_id = user.id 
			where realname like ?
			limit ?,?
			`

      const sql1 = `
			select count(*) total
			from repair 
			left join user on user_id = user.id 
			where realname like ?
			`
      const [res] = await connection.execute(sql, [`%${realname}%`, offset, size])
      const [res1] = await connection.execute(sql1, [`%${realname}%`])
      return { repairList: res, total: res1[0].total }
    } else {
      const sql = `
			select  repair.id, repair.content,repair.place, repair.status ,repair.createtime,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from repair 
			left join user on user_id = user.id 
			limit ?,?
			`
      const sql1 = `
			select count(*) total
			from repair 
			left join user on user_id = user.id 
			`
      const [res] = await connection.execute(sql, [offset, size])
      const [res1] = await connection.execute(sql1)
      return { repairList: res, total: res1[0].total }
    }
  }

  // 删除报修
  async deleteRepair(id) {
    const sql = `delete from repair where id = ? ; `
    await connection.execute(sql, [id])
  }

  // 更新报修
  async updateRepair(content, place, status, id) {
    const sql = `update repair set content = ? , place = ? ,status = ? where id = ? `
    await connection.execute(sql, [content, place, status, id])
  }

  // 获取用户的全部报修
  async getRepairById(id, offset, size) {
    const sql = `
		select  repair.id, repair.content,repair.place, repair.status ,repair.createtime,
		JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
		from repair 
		left join user on user_id = user.id where user.id = ?
		limit ?,?
		`

    const sql1 = `
		select count(*) total
		from repair 
		left join user on user_id = user.id where user.id = ?
		`
    const [res] = await connection.execute(sql, [id, offset, size])
    const [res1] = await connection.execute(sql1, [id])
    return { repairList: res, total: res1[0].total }
  }
}
module.exports = new RepairService()
