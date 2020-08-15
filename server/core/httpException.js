const {
  HttpException
} = require('lin-mizar')
class Success extends HttpException {
  constructor(data,msg, errorCode) {
    super()
    this.code = 200
    this.msg = msg || '操作成功'
    this.errorCode = errorCode || -9999
    this.data = data
  }
}
class DbError extends HttpException{
  constructor(msg,errorCode){
    super()
    this.code = 500
    this.msg = msg||'数据库错误'
    this.errorCode = errorCode || 9999
  }
}
class NotFound extends HttpException{
  constructor(msg,errorCode){
    super()
    this.code = 404
    this.msg = msg||"资源未找到"
    this.errorCode = errorCode || 10000
  }
}
class Forbidden extends HttpException{
  constructor(msg,errorCode){
    super()
    this.code = 403
    this.msg = msg||'禁止进入'
    this.errorCode = errorCode || 10001
  }
}
module.exports = {
  HttpException,
  Success,
  DbError,
  NotFound,
  Forbidden
}