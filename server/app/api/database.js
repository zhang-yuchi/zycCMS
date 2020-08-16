const Router = require('koa-router')
const createAuto = require('../../config/auto')
const { ImportValidator } = require('../validator/database')
const { Success } = require('../../core/httpException')
const router = new Router({
  prefix: '/database'
})
router.post('/import', async (ctx, next) => {
  //导入数据库
  const v = await new ImportValidator().validate(ctx)
  const auto = createAuto(v.get('body.isAll'),v.get('body.tables'))
  auto.run((err)=>{
    if(err)
    console.log(err);
  })
  throw new Success()
})
module.exports = router