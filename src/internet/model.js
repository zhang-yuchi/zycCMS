import service from './index'
export const getModels = ()=>{
  return service.get('/model')
}
export const addModel = (params)=>{
  return service.post('/model/addModel',params)
}