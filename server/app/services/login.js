const {
  User
} = require('../models/user')
const {
  Auth
} = require('../models/auth')
const {
  generateToken
} = require('../../core/util')
const jwt = require('jsonwebtoken')
const { verifyValidator } = require('../validator/user')
const { Success,Forbidden } = require('../../core/httpException')
const security = require('../../config/config.json').server.security
class Login {
  static async token(v) {
    //颁布token
    const user = await User.verify(v.get('body.username'), v.get('body.password'))
    const auth = await Auth.findAuth(user.id)
    const token = generateToken(user.id,auth.weigh)
    throw new Success(token,"登陆成功")
  }
  static async verify(token){
    let errMsg = 'token不合法'
    try {
      var decode = await jwt.verify(token, security.secretKey)//解码
      
    } catch (err) {
      //什么情况的不合法
      //瞎传
      console.log(err);
      //过期
      if(err.name == 'TokenExpiredError'){
        //令牌过期错误
        errMsg = "token已过期"
      }
      throw new Forbidden(errMsg)
    }
    throw new Success('登录成功')
  }
}
module.exports = {
  Login
}