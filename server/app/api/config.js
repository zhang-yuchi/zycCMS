const Router = require('koa-router')
const path = require('path')
const {
  configValidator
} = require('../validator/config')
const {
  dataBase
} = require('../models/utils/config/database')
const config = require('../../config/config.json')
const {
  keyModel
} = require('../models/utils/config/keyModel')
const {
  Success
} = require('../../core/httpException')
const {
  hasDb,DbSuccess
} = require('../../core/util')
const {
  FileHelper
} = require('../models/utils/fileHelper')
const {
  db
} = require('../../core/db')
const router = new Router({
  prefix: '/config'
})
//是否存在数据库,若不存在则需要先配置
router.get('/', async (ctx, next) => {
  throw new Success({
    db: hasDb() ? config.server.database : null,
    security: config.server.security
  })
})
router.put('/', async (ctx, next) => {
  const v = await new configValidator().validate(ctx)
  const d = new dataBase(v)
  const key = new keyModel(v)
  // console.log('11111');
  await FileHelper.jsonTransfer(path.join(__dirname, '../../config/config.json'), {
    server: {
      port: 3000,
      database: {
        dbName: d.dbname,
        host: d.host,
        port: d.dbport,
        user: d.username,
        password: d.password
      },
      security: {
        secretKey: key.secretKey,
        expiresIn: key.expiresIn
      }
    }
  })
  // console.log(db);
  throw new Success()
})
router.get('/db/success',async(ctx,next)=>{
  await DbSuccess()
  throw new Success({},'数据库验证成功')
})
module.exports = router