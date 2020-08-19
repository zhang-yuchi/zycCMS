const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const router = new Router({
  prefix: '/test'
})
router.get('/modify',async (ctx,next)=>{
  fs.readFile(path.join(__dirname,'../../test/index.json'),'utf8',(err,data)=>{
    if(err)throw err
    let list = JSON.parse(data)
    // console.log(list.name);
    list.name = 'wtk'
    let newContent = JSON.stringify(list);
    fs.writeFile(path.join(__dirname,'../../test/index.json'), newContent, 'utf8', (err) => {
        if (err) throw err;
        console.log('success done');
    });
  })
})

module.exports = router