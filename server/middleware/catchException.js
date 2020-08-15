const {HttpException} = require('../core/httpException')
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.log(error);
        //  开发环境下需要知道错误,而不是返回给客户端未知
        //  开发环境并且不是HttpException
        // const isDev = global.config.environment === 'dev'
        const isHttpException = error instanceof HttpException
        if (error instanceof HttpException) {
            ctx.body = {
                msg:error.msg,
                error_code:error.error_code,
                status:error.code?error.code:200,
                url:`${ctx.method} ${ctx.path}`,
                data:error.data
            }
            ctx.status = 200
        } else {
            ctx.body = {
                msg: "服务器开小差了",
                error_code:999,
                status:500,
                url:`${ctx.method} ${ctx.path}`,
                data:null
            }
            ctx.status = 500
        }
    }
}
module.exports = catchError