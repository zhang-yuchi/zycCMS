const {
  LinValidator,
  Rule
} = require('lin-mizar');
class ImportValidator extends LinValidator {
  constructor() {
    super()
    this.isAll = [
      new Rule('isBoolean', '请传入isAll字段')
    ]
    this.tables = [

    ]
  }

}
module.exports = {
  ImportValidator
}