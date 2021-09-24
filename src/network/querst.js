import axios from "axios";

export function query(config){
  const server = axios.create({
    baseURL:'/api',
    timeout: 5000
  })
  /*// 拦截请求
  server.interceptors.request.use(config => {
    return config
  },error => {
    console.log(error)
  })
  // 响应数据
  server.interceptors.response.use(config => {

    return config.data
  },error => {
    console.log(error)
  })*/
  return server(config)
}
