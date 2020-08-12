const jwt = require('jsonwebtoken')
const { security } = require('../config/config')
const {db} = require('../core/db')
const generateToken = function(uid,scope){
  const token = jwt.sign({
    uid,scope//塞入想之后被解析的数据
  },security.secretKey,{expiresIn:security.expiresIn})
  return token
}
const hasDb = function(){
  if(db){
    return true
  }
  return false
}
module.exports = {
  generateToken,
  hasDb
}