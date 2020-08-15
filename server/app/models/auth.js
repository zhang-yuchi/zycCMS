const {
  db
} = require('../../core/db')
const { NotFound } = require('../../core/httpException')
const {
  Sequelize,
  Model
} = require('sequelize')

class Auth extends Model {
  static async findAuth(id){
    const auth = await Auth.findOne({
      where:{
        uid:id
      }
    })
    if(!auth){
      throw new NotFound('用户异常,权限丢失')
    }
    return auth
  }
}
if (db) {
  Auth.init({
    uid: {
      type: Sequelize.INTEGER,
      primaryKey: true, //设置主键 关系型数据库中重要的概念
    },
    weigh: {
      type: Sequelize.INTEGER //权重 最高64
    },
    sectorId: Sequelize.INTEGER //部门编号
  }, {
    sequelize: db,
    tableName: "cms_auth"
  })
  Auth.findOne({
    where: {
      uid: 1
    }
  }).then(res => {
    if (!res) {
      Auth.create({
        uid: 1,
        weigh: 128,
        sectorId: 0
      })
    }
  })

}
module.exports = {
  Auth
}