const Router = require('koa-router')

const {
    User
} = require('../models/user')

const router = new Router({
    prefix: '/user'
})
//注册 新增数据
// router.post('/register', async (ctx, next) => {
//     //四位路径
//     //接受参数 参数校验

//     // const v = await new RegisterValidator().validate(ctx)
//     // const user = {
//     //     email: v.get('body.email'),
//     //     password: v.get('body.password2'),
//     //     nickname: v.get('body.nickname'),
//     // }
//     // const r = await User.create(user)
//     // throw new Success()

//     //token jwt
//     //jwt可以携带数据

//     //email password1 password2 nickname


// })
module.exports = router