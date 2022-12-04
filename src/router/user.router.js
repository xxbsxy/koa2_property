const Router = require('koa-router')
const { addUser, updateUser } = require('../controller/user.controller')
const { verifyUsername, handlePassword } = require('../middleware/user.middleware')
const router = new Router()

router.prefix('/user')

// 添加用户
router.post('/', verifyUsername, handlePassword, addUser)
// 修改用户
router.put('/:userId', updateUser)
module.exports = router
