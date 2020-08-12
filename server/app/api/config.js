const Router = require('koa-router')
const path = require('path')
const {
  databaseValidator
} = require('../validator/config')
const {
  dataBase
} = require('../models/utils/database')
const {
  Success
} = require('../../core/httpException')
const {
  hasDb
} = require('../../core/util')
const {
  FileHelper
} = require('../models/utils/fileHelper')
const router = new Router({
  prefix: '/config'
})
//是否存在数据库,若不存在则需要先配置
router.get('/', async (ctx, next) => {
  throw new Success({
    db: hasDb()
  })
})
router.put('/', async (ctx, next) => {
  const v = await new databaseValidator().validate(ctx)
  const d = new dataBase(v)
  console.log(d);
  FileHelper.jsonTransfer(path.join(__dirname,'../../config/config.json'),{
    server: {
      port: 3000,
      database: {
        dbName: d.dbname,
        host:d.host ,
        port: d.dbport,
        user: d.username,
        password: d.password
      },
      security: {
        secretKey: "abcdefg",
        expiresIn: 2592000
      }
    }
  })


  throw new Success()
})
module.exports = router