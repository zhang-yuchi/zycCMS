import axios from 'axios'
import config from '../../config.json'
const service = axios.create({
  baseURL: config.host + ':' + config.port,
})
//请求处理
service.interceptors.request.use((config) => {
  return config
})
//响应处理
service.interceptors.response.use((res) => {
  //做全局处理
  if (res.status === 200) {
    return res.data
  }
  return res

})
export default service
