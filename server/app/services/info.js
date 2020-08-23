//获取关于用户信息,以用户为主键
const {
  User
} = require('../models/user')
const {
  Auth
} = require('../models/auth')
const { db } = require('../../core/db')
if (db) {
  User.hasOne(Auth, {
    foreignKey: 'uid',
    sourceKey: 'id'
  })
}

class Info {
  static async getUserInfo(id) {
    // console.log(id);
    return await User.findOne({
      where: {
        id: id
      },
      attributes: ['id', 'username'],
      include: [{
        model: Auth,
        attributes: ['sector_id']
      }]
    })
  }
}
module.exports = {
  Info
}