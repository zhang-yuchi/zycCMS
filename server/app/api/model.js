const Router = require('koa-router')
const {
  Success
} = require('../../core/httpException')
const { findModels } = require('../../core/util')
const router = new Router({
  prefix: '/model'
})

// const {
//   Sequelize
// } = require('sequelize')
// const {
//   db
// } = require('../../core/db')
// const User = require('../models/users/user')
router.get('/', async (ctx, next) => {
  const array = findModels()
  const nameArray = array.map(item=>{
    return item.name
  })
  // console.log(nameArray);
  throw new Success(nameArray)
  // console.log(typeof array[0]);
  // console.log(User(db,Sequelize).constructor.name)
  // throw new Success(User(db,Sequelize).constructor.name)
})
module.exports = router