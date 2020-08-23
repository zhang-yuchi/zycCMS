const {
  LinValidator,
  Rule
} = require('lin-mizar');
class addModelValidator extends LinValidator{
  constructor(){
    super()
    this.modelName = [
      new Rule('isLength','模块名不能为空',{
        min:1
      })
    ]
  }
}
module.exports = {
  addModelValidator
}