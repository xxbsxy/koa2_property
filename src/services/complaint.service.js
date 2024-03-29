const connection = require('../app/database')

class ComplaintService {
  // 添加投诉
  async addComplaint(content, remark, type, id) {
    const sql = `insert into complaint (content,remark, type, user_id) values (?,?,?,?) ;`
    await connection.execute(sql, [content, remark, type, id])
  }

  // 更新投诉
  async updateComplaint(content, status, remark, type, handle_user, handle_phone, id) {
    const sql = `update complaint set content = ? , status = ? ,remark =? , type = ?,handle_user = ?, handle_phone = ? where id = ? ; `
    await connection.execute(sql, [content, status, remark, type, handle_user, handle_phone, id])
  }

  // 删除投诉
  async deleteComplaint(id) {
    const sql = `delete from complaint where id = ? ; `
    await connection.execute(sql, [id])
  }

  // 获取投诉列表
  async getComplaintList(realname, offset, size) {
    if (realname) {
      const sql = `
			select  complaint.id, complaint.content, complaint.type ,complaint.status,complaint.remark,complaint.handle_user,complaint.handle_phone,complaint.createtime,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from complaint 
			left join user on user_id = user.id 
			where realname like ?
			limit ?,?
			`
      const sql1 = `
			select count(*) total
			from complaint 
			left join user on user_id = user.id 
			where realname like ?
			`
      const [res] = await connection.execute(sql, [`%${realname}%`, offset, size])
      const [res1] = await connection.execute(sql1, [`%${realname}%`])
      return { complaintList: res, total: res1[0].total }
    } else {
      const sql = `
			select  complaint.id, complaint.content, complaint.type ,complaint.status,complaint.remark,complaint.handle_user,complaint.handle_phone,complaint.createtime,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from complaint 
			left join user on user_id = user.id 
			limit ?,?
			`
      const sql1 = `
			select count(*) total
			from complaint 
			left join user on user_id = user.id 
			`
      const [res] = await connection.execute(sql, [offset, size])
      const [res1] = await connection.execute(sql1)

      return { complaintList: res, total: res1[0].total }
    }
  }

  // 获取单个用户的投诉
  async getComplaintById(id, offset, size) {
    const sql = `
		select  complaint.id, complaint.content, complaint.type ,complaint.status,complaint.remark,complaint.handle_user,complaint.handle_phone,complaint.createtime,
    JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
    from complaint 
    left join user on user_id = user.id where user.id = ? 
		limit ?, ?
		`
    const sql1 = `
		select count(*) total
		from complaint 
		left join user on user_id = user.id  where user.id = ? 
		`
    const [res] = await connection.execute(sql, [id, offset, size])
    const [res1] = await connection.execute(sql1, [id])

    return { complaintList: res, total: res1[0].total }
  }
}
module.exports = new ComplaintService()
