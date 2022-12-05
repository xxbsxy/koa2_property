const connection = require('../app/database')

class ComplaintService {
  async addComplaint(content, id) {
    const sql = `insert into complaint (content, user_id) values (?,?) ;`
    await connection.execute(sql, [content, id])
  }
  async updateComplaint(content, status, id) {
    const sql = `update complaint set content = ? , status = ? where id = ? ; `
    await connection.execute(sql, [content, status, id])
  }
  async deleteComplaint(id) {
    const sql = `delete from complaint where id = ? ; `
    await connection.execute(sql, [id])
  }
  async getComplaintList() {
    const sql = `
		select  complaint.id, complaint.content, complaint.status ,complaint.createtime,
    JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
    from complaint 
    left join user on user_id = user.id 
		`
    const [res] = await connection.execute(sql)
    return res
  }
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
