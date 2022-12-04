const crypto = require('crypto')

// 对密码进行md5加密
const md5Password = (password) => {
  const md5 = crypto.createHash('md5')
  const res = md5.update(password).digest('hex')
  return res
}

module.exports = {
  md5Password
}
