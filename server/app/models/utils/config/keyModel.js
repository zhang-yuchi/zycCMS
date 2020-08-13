class keyModel {
  constructor(v){
    this.secretKey = v.get('body.secretKey')||'abcdefg'
    this.expiresIn = v.get('body.expiresIn')||2592000
  }
}
module.exports = {
  keyModel
}