const connection = require('../app/database')

class UserService {
  // 添加用户
  async addUser(username, realname, sex, age, password, phone, role) {
    const sql = `insert into user (username, realname, sex, age, password, phone, role) 
		values (?,?,?,?,?,?,?)`
    await connection.execute(sql, [username, realname, sex, age, password, phone, role])
  }

  // 判断用户名是否存在
  async hasUsername(username) {
    const sql = `select * from user where username = ?`
    const [res] = await connection.execute(sql, [username])
    return res.length === 0 ? false : true
  }

  // 更新用户
  async updateUser(userId, username, realname, sex, age, phone) {
    const sql = `update user set 
		username = ?,realname = ?,sex = ?,age = ?,phone = ? where id = ?
		`
    await connection.execute(sql, [username, realname, sex, age, phone, userId])
  }

  // 删除用户
  async deleteUser(userId) {
    const sql = `delete from user where id = ?`
    await connection.execute(sql, [userId])
  }

  // 获取用户列表
  async getUserList(username, offset, size) {
    if (username) {
      const sql = `select * from user where role = '用户' and username like ? limit ?,?`
      const sql1 = `select count(*) total from user where username like ?`
      const [res] = await connection.execute(sql, [`%${username}%`, offset, size])
      const [res1] = await connection.execute(sql1, [`%${username}%`])
      return { userList: res, total: res1[0].total }
    } else {
      const sql = `select * from user where role = '用户'  limit ?,?`
      const sql1 = `select count(*) total from user `
      const [res] = await connection.execute(sql, [offset, size])
      const [res1] = await connection.execute(sql1)
      return { userList: res, total: res1[0].total }
    }
  }

  // 根据id获取用户
  async getUserById(id) {
    const sql = `select * from user where id = ?`
    const [res] = await connection.execute(sql, [id])
    return res[0]
  }

  // 查询用户
  async queryUser(username) {
    const sql = `select * from user where username like ?`
    const [res] = await connection.execute(sql, [`%${username}%`])
    const sql1 = `select count(*) total from user where username like ?`
    const [res1] = await connection.execute(sql1, [`%${username}%`])
    return { userList: res, total: res1[0].total }
  }
}

module.exports = new UserService()
