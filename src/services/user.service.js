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
    console.log(res)
    return res.length === 0 ? false : true
  }

  async updateUser(userId, username, realname, sex, age, password, phone) {
    const sql = `update user set 
		username = ?,realname = ?,sex = ?,age = ?,password = ?,phone = ? where id = ?
		`
    await connection.execute(sql, [username, realname, sex, age, password, phone, userId])
  }
  async deleteUser(userId) {
    const sql = `delete from user where id = ?`
    await connection.execute(sql, [userId])
  }
  async getUserList() {
    const sql = `select * from user where role = '用户'`
    const [res] = await connection.execute(sql)
    return res
  }
}

module.exports = new UserService()
