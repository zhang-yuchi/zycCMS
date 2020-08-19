const jwt = require('jsonwebtoken')

const {
  Sequelize
} = require('sequelize')
const requireDirectory = require('require-directory');
const path = require('path');
const {
  db
} = require('./db')
const {
  DbError
} = require('./httpException')
const config = require('../config/config')
const security = config.server.security
const generateToken = function (uid, scope) {
  const token = jwt.sign({
    uid,
    scope //塞入想之后被解析的数据
  }, security.secretKey, {
    expiresIn: security.expiresIn
  })
  return token
}
const hasDb = function () {
  if (db) {
    return true
  }
  return false
}
const DbSuccess = async function () {

  await db.authenticate().then(() => {
      console.log('database connect successfully');
    })
    .catch(() => {
      console.log('error here');
      throw new DbError()
    })
}

function findModels() {
  const apiDirectory = path.join(process.cwd(), './server/app/models/users')
  const modelArray = []
  requireDirectory(module, apiDirectory, {
    visit: whenLoadMoudle,
  })

  function whenLoadMoudle(obj) {
    // console.log(new obj(db,Sequelize)())
    modelArray.push(obj(db,Sequelize))
  }
  return modelArray
}
module.exports = {
  generateToken,
  hasDb,
  DbSuccess,
  findModels
}