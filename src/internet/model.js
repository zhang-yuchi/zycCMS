import service from './index'
export const getModels = ()=>{
  return service.get('/model')
}