//关于配置有关的校验器
const {
  LinValidator,
  Rule
} = require('lin-mizar');
class databaseValidator extends LinValidator {
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
  }
}
module.exports = {
  databaseValidator
}