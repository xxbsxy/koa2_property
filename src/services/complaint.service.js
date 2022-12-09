const connection = require('../app/database')

class ComplaintService {
  // 添加投诉
  async addComplaint(content, id) {
    const sql = `insert into complaint (content, user_id) values (?,?) ;`
    await connection.execute(sql, [content, id])
  }

  // 更新投诉
  async updateComplaint(content, status, id) {
    const sql = `update complaint set content = ? , status = ? where id = ? ; `
    await connection.execute(sql, [content, status, id])
  }

  // 删除投诉
  async deleteComplaint(id) {
    const sql = `delete from complaint where id = ? ; `
    await connection.execute(sql, [id])
  }

  // 获取投诉列表
  async getComplaintList(realname) {
    if (realname) {
      console.log(realname)
      const sql = `
			select  complaint.id, complaint.content, complaint.status ,complaint.createtime,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from complaint 
			left join user on user_id = user.id 
			where realname like ?
			`
      const [res] = await connection.execute(sql, [`%${realname}%`])
      return res
    } else {
      const sql = `
			select  complaint.id, complaint.content, complaint.status ,complaint.createtime,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from complaint 
			left join user on user_id = user.id 
			`
      const [res] = await connection.execute(sql)
      return res
    }
  }

  // 获取单个用户的投诉
  async getComplaintById(id) {
    const sql = `
		select  complaint.id, complaint.content, complaint.status ,complaint.createtime,
    JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
    from complaint 
    left join user on user_id = user.id where user.id = ? 
		`
    const [res] = await connection.execute(sql, [id])
    return res
  }
}
module.exports = new ComplaintService()
