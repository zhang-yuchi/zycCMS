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
module.exports = {
  HttpException,
  Success
}