const Router = require('koa-router')
const { Success } = require('../../core/httpException')
const router = new Router({
  prefix: '/model'
})
router.get('/',async (ctx,next)=>{
  
})
module.exports = router