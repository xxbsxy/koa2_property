const Router = require('koa-router')
const { getCarList, addCar, deleteCar, updateCar } = require('../controller/car.controller')

const router = new Router()

router.prefix('/car')

// 获取全部车位信息
router.get('/', getCarList)

// 更新车位信息
router.put('/:id', updateCar)

// 添加车位信息
router.post('/', addCar)

// 删除车位
router.delete('/:id', deleteCar)

module.exports = router
