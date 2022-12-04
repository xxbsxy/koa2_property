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
}

module.exports = new UserService()
