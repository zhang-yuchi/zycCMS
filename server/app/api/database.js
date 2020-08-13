const Router = require('koa-router')
const auto = require('../../config/auto')
const router = new Router({
  prefix: '/database'
})
router.get('/import', async (ctx, next) => {
  //导入数据库
  auto.run(function (err) {
    if (err) console.log(err);
    // console.log(auto.tables); // table list
    // console.log(auto.foreignKeys); // foreign key list
  });
})
module.exports = router