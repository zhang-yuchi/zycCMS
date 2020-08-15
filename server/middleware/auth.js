const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const {
  security
} = require('../config/config')
const {
  Forbidden
} = require('../core/httpException')
class Auth {
  constructor(level) {
    this.level = level||1//构建API的级别,确定访问权限
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req) //ctx.req nodejs request对象
      let errMsg = "token不合法"
      if (!userToken) {
        //不合法
        throw new Forbidden(errMsg)
      }
      try {
        var decode = jwt.verify(userToken.name, security.secretKey)//解码
      } catch (err) {
        //什么情况的不合法
        //瞎传
        //过期
        // console.log(err);
        if(err.name == 'TokenExpiredError'){
          //令牌过期错误
          errMsg = "token已过期"
        }
        throw new Forbidden(errMsg)
      }
      if(decode.scope<this.level){
        errMsg = '权限不足'
        throw new Forbidden(errMsg)
      }
      // ctx.body = userToken
      //token检测
      //token获取 传递令牌
      //token body header
      //HTTP 规定身份验证机制 HttpBasicAuth
      ctx.auth = {
        uid:decode.uid,
        scope:decode.scope
      }
      await next()
    }
  }
  static async verifyToken(token){
    try {
      var decode = jwt.verify(token, security.secretKey)//解码
      return true
    } catch (error) {
      return false
    }
  }
}
module.exports = {
  Auth
}