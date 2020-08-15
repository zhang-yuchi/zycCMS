const {
  LinValidator,
  Rule,
  Lin
} = require('lin-mizar');
class tokenValidator extends LinValidator {
  constructor() {
    super()
    this.password = [
      new Rule('isLength', "密码不能低于6位", {
        min: 5
      })
    ]
  }
}
class verifyValidator extends LinValidator {
  constructor(){
    super()
    this.token = [
      
    ]
  }
}
module.exports = {
  tokenValidator,
  verifyValidator
}