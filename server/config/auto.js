//sequelize-auto 自动导入表
const config = require('./config.json') 
const path = require('path')
const db = config.server.database
var SequelizeAuto = require('sequelize-auto')
const createAuto = function(isAll,tables){
    let config = {
        host: db.host,
        dialect: 'mysql',
        directory: path.join(__dirname,'../app/models/users'), // prevents the program from writing to disk
        port: db.port,
        additional: {
            timestamps: false,
            paranoid: true, //删除时间戳
            underscored: true, //驼峰转换成下划线
            freezeTableName: true,
        }
    }
    if(!isAll){
        tables = tables.map(item=>{
            return item.value
        })
        config.tables = tables
    }
    var auto = new SequelizeAuto(
        db.dbName, db.user, db.password,config
    )
    return auto
}
module.exports = createAuto