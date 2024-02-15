import axios, { AxiosRequestConfig } from "axios"

const get = (url: string, config: AxiosRequestConfig | undefined = {}) =>
  axios.get(url, config)

const post = (
  url: string,
  data: any,
  config: AxiosRequestConfig | undefined = {},
) => axios.post(url, data, config)

const patch = (
  url: string,
  data: any,
  config: AxiosRequestConfig | undefined = {},
) => axios.patch(url, data, config)

const deleteAxios = (
  url: string,
  config: AxiosRequestConfig | undefined = {},
) => axios.delete(url, config)

const put = (
  url: string,
  body: any,
  config: AxiosRequestConfig | undefined = {},
) => axios.put(url, body, config)

const API: any = {
  get,
  post,
  patch,
  put,
  delete: deleteAxios,
}

export default API
