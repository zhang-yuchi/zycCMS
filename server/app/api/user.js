const Router = require('koa-router')
const {
    Success
} = require('../../core/httpException')
const {
    Login
} = require('../services/login')
const { tokenValidator,verifyValidator } = require('../validator/user')
const router = new Router({
    prefix: '/user'
})
router.post('/login', async (ctx, next) => {
    const v = await new tokenValidator().validate(ctx)
    // console.log(v.get('body.password'));
    // throw new Success(v.get('body.password'))
    await Login.token(v)
})
router.get('/login/verify',async(ctx,next)=>{
    const v = await new verifyValidator().validate(ctx)
    await Login.verify(v.get('header.token'))
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