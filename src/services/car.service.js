const connection = require('../app/database')

class CarService {
  async addCar(position, fees, area, remark, car_num, status) {
    const sql = `insert into car (position, fees, area, remark, car_num, status) values (?,?,?,?,?,?) ;`
    await connection.execute(sql, [position, fees, area, remark, car_num, status])
  }
  async updateCar(position, fees, area, remark, car_num, id) {
    const sql = `update car set position = ? , fees = ?,area = ? , remark = ? , car_num = ? where id = ? ; `
    await connection.execute(sql, [position, fees, area, remark, car_num, id])
  }
  async deleteCar(id) {
    const sql = `delete from car where id = ? ; `
    await connection.execute(sql, [id])
  }
  async getCarList(realname, offset = 0, size = 10) {
    if (realname) {
      const sql = `
			select car.id, car.position,car.fees,car.area,car.remark,car.car_num,car.createtime,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from car 
			left join user on user_id = user.id 
			where realname like ?
			limit ?,?
			`

      const sql1 = `
			select count(*) total
			from car 
			left join user on user_id = user.id 
			where realname like ?
			`
      const [res] = await connection.execute(sql, [`%${realname}%`, offset, size])
      const [res1] = await connection.execute(sql1, [`%${realname}%`])
      return { carList: res, total: res1[0].total }
    } else {
      const sql = `
			select car.id, car.position,car.fees,car.area,car.remark,car.car_num,car.createtime,
			JSON_OBJECT('id',user.id,'username',user.username,'realname',user.realname,'phone',user.phone) user
			from car 
			left join user on user_id = user.id 
			limit ?,?
			`
      const sql1 = `
			select count(*) total
			from car 
			left join user on user_id = user.id 
			`
      const [res] = await connection.execute(sql, [offset, size])
      const [res1] = await connection.execute(sql1)
      return { carList: res, total: res1[0].total }
    }
  }
}

module.exports = new CarService()
