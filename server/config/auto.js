//sequelize-auto 自动导入表
const config = require('./config.json') 
const path = require('path')
const db = config.server.database
var SequelizeAuto = require('sequelize-auto')
console.log(db);
var auto = new SequelizeAuto(
    db.dbName, db.user, db.password, {
        host: db.host,
        dialect: 'mysql',
        directory: path.join(__dirname,'../app/models/users'), // prevents the program from writing to disk
        port: db.port,
        additional: {
            timestamps: true,
            paranoid: true, //删除时间戳
            createAt: "created_at",
            updateAt: "updated_at",
            deletedAt: "deleted_at",
            underscored: true, //驼峰转换成下划线
            freezeTableName: true,
        }
    }
)
module.exports = auto