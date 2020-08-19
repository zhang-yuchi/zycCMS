const Router = require('koa-router')
const requireDirectory = require('require-directory');
const path = require('path');
const { hasDb } = require('../core/util')
class InitManager {
    static initCore(app) {
        //入口方法
        InitManager.app = app
        InitManager.loadConfig()
        InitManager.initLoadRouters()
    }
    static initLoadRouters() {
        const apiDirectory = path.join(process.cwd(),'./server/app/api')
        requireDirectory(module,apiDirectory,{
            visit:whenLoadMoudle
        })
        // }) //可以指向嵌套路由
        function whenLoadMoudle(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
    static loadConfig(path=''){
        //用于判断是否为生产环境
        // const configPath = path||process.cwd() + '/config/config.js'
        // const config = require(configPath)
        // global.config = config
    }
}
module.exports = InitManager