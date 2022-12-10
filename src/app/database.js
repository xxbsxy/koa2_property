const mysql = require('mysql2')

// const connections = mysql.createPool({
//   host: '127.0.0.1',
//   port: '3306',
//   database: 'property',
//   user: 'root',
//   password: 'xxbsxy'
// })
const connections = mysql.createPool({
  host: '43.143.0.76',
  port: '3306',
  database: 'property',
  user: 'cgdcgd',
  password: 'cgdcgd'
})
connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (!err) {
      console.log('连接数据库成功')
    } else {
      console.log('连接数据库失败')
    }
  })
})

module.exports = connections.promise()
