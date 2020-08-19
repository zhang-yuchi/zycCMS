import service from './index'
export const login = (params)=>{
  return service.post('/user/login',params)
}
export const loginVerify = ()=>{
  return service.get('/user/login/verify')
}
export const userInfo = ()=>{
  return service.get('/user/info')
}