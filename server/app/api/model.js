const Router = require('koa-router')
const {
  Success
} = require('../../core/httpException')
const {
  addModelValidator
} = require('../validator/model')
const {
  findModels
} = require('../../core/util')
const {
  modelAddWasher
} = require('../../core/util')
const {
  FileHelper
} = require('../models/utils/fileHelper')
const path = require('path')
const router = new Router({
  prefix: '/model'
})

// const {
//   Sequelize
// } = require('sequelize')
// const {
//   db
// } = require('../../core/db')
// // const User = require('../models/users/user')
// const score = require('../models/users/score')
// const { Sequelize } = require('sequelize/types')
router.get('/', async (ctx, next) => {
  const array = findModels()
  const nameArray = array.map(item => {
    return item.name
  })
  // console.log(nameArray);
  throw new Success(nameArray)
  // console.log(typeof array[0]);
  // console.log(User(db,Sequelize).constructor.name)
  // throw new Success(User(db,Sequelize).constructor.name)
})
router.post('/addModel', async (ctx, next) => {
  const v = await new addModelValidator().validate(ctx)
  let weight = v.get('body.weight')
  let modelName = v.get('body.modelName')
  let mainTable = v.get('body.mainTable')
  let mainTableKeys = v.get('body.mainTableKeys')
  let extraTables = v.get('body.extraTables')
  // console.log(weight);
  let result = modelAddWasher(extraTables,mainTableKeys)
  mainTableKeys = result.mainTableKeys
  extraTables = result.extraTables
  // mainTableKeys = modelAddWasher(extraTables,mainTableKeys).mainTableKeys
  await FileHelper.jsonWritter(path.join(__dirname,'../block/'+modelName+'.json'),{
    weight,
    modelName,
    mainTable,
    mainTableKeys,
    extraTables
  })
  throw new Success()
})
router.get('/getModels', async (ctx, next) => {
  // let s = await score(db,Sequelize).findOne({
  //   where:{
  //     id:1
  //   }
  // })
  // console.log(s);
})
module.exports = router