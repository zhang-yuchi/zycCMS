class dataBase {
  constructor(v) {
    //将database的基本属性挂载至database对象
    this.host = v.get('body.host')
    this.dbname = v.get('body.dbname')
    this.dbport = v.get('body.dbport')
    this.username = v.get('body.username')
    this.password = v.get('body.password')||''
  }
}
module.exports = {
  dataBase
}