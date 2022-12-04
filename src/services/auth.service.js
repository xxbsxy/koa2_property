const connection = require('../app/database')

class AuthService {
  async checkLogin(username, password) {
    const sql = `select * from user where username = ? and password = ?`
    const [res] = await connection.execute(sql, [username, password])
    return res[0]
  }
}

module.exports = new AuthService()
