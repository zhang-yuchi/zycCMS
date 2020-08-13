//关于配置有关的校验器
const {
  LinValidator,
  Rule
} = require('lin-mizar');
class configValidator extends LinValidator {
  constructor() {
    super()
    this.dbname = [
      new Rule('isLength', '数据库名称不能为空', {
        min: 1
      }),
    ]
    this.dbport = [
      new Rule('isInt', '数据库端口号应为数字', {
        min: 1
      }),
    ]
    this.host = [
      new Rule('isLength', '数据库地址不能为空', {
        min: 1
      }),
    ]
    this.username = [
      new Rule('isLength', '数据库用户名不能为空', {
        min: 1
      }),
    ]
    this.expiresIn = [
      new Rule('isOptional','',2592000),
      new Rule('isInt','超时时间是一个数字')
    ]
    this.secretKey = [
      new Rule('isOptional','',''),
      new Rule('isLength','密钥长度不能低于7位',{
        min:7
      })
    ]
  }
}
module.exports = {
  configValidator
}