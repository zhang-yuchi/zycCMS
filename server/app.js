const koa = require('koa')
const app = new koa()
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const config = require('./config/config')
const cors = require('koa2-cors');
const catchError = require('./middleware/catchException')
app.use(cors())
app.use(parser())
app.use(catchError)
InitManager.initCore(app)
app.listen(config.server.port,()=>{
  console.log(`server is running at ${config.server.port}`);
})