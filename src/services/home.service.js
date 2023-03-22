const connection = require('../app/database')
class HomeService {
  //添加一个房屋
  async addHome(area, des, position, type) {
    const sql = `insert into home (area, des, position,type) values (?,?,?,?) ;`
    await connection.execute(sql, [area, des, position, type])
  }
  // 删除一个房屋
  async deleteHome(id) {
    const sql = `delete from home where id = ? ; `
    await connection.execute(sql, [id])
  }

  // 更新一个房屋
  async updateHome(area, des, position, type, id) {
    const sql = `update home set area = ? , des = ?, position = ?,type = ? where id = ? ; `
    await connection.execute(sql, [area, des, position, type, id])
  }

  // 获取单个用户的房屋
  async getHomeById(id, offset, size) {
    const sql = `
		select  home.id, home.position,home.area, home.des , home.type,home.createtime,home.updatetime,
		JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
		from home 
		left join user on user_id = user.id where user.id = ?
		limit ?,?
		`
    const sql1 = `
		select count(*) total
		from home 
		left join user on user_id = user.id where user.id = ?
		`
    const [res] = await connection.execute(sql, [id, offset, size])
    const [res1] = await connection.execute(sql1, [id])
    return { homeList: res, total: res1[0].total }
  }

  // 获取房屋列表
  async getHome(realname, offset, size) {
    if (realname) {
      const sql = `
			select  home.id, home.position,home.area, home.des , home.type,home.createtime,home.updatetime,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from home 
			left join user on user_id = user.id 
			where realname like ?
			limit ?,?
			`

      const sql1 = `
			select count(*) total
			from home 
			left join user on user_id = user.id 
			where realname like ?
			`
      const [res] = await connection.execute(sql, [`%${realname}%`, offset, size])
      const [res1] = await connection.execute(sql1, [`%${realname}%`])
      return { homeList: res, total: res1[0].total }
    } else {
      const sql = `
			select  home.id, home.position,home.area, home.des , home.type,home.createtime,home.updatetime,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from home 
			left join user on user_id = user.id 
			limit ?,?
			`
      const sql1 = `
			select count(*) total
			from home 
			left join user on user_id = user.id 
			`
      const [res] = await connection.execute(sql, [offset, size])
      const [res1] = await connection.execute(sql1)
      return { homeList: res, total: res1[0].total }
    }
  }
}

module.exports = new HomeService()
