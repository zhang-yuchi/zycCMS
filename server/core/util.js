const jwt = require('jsonwebtoken')
const config = require('../config/config')
const {
  db
} = require('./db')
const {DbError} = require('./httpException')
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
module.exports = {
  generateToken,
  hasDb,
  DbSuccess
}