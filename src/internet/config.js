import service from './index'
export const getConfig = () => {
  //获取数据库配置
  return service.get('/config')
}
export const putConfig = (params)=>{
  return service.put('/config',params)
}
export const validateDb = ()=>{
  return service.get('/config/db/success')
}