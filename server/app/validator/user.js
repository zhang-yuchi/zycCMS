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
class AuthValidator extends LinValidator {
  constructor() {
    super()
    this.token = [
      new Rule('isLength', 'token为必传参数', {
        min: 1
      })
    ]
  }
}
class verifyValidator extends LinValidator {
  constructor() {
    super()
    this.token = []
  }
}
module.exports = {
  tokenValidator,
  verifyValidator,
  AuthValidator
}