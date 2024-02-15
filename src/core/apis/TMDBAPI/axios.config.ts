import axios from "axios"

const axiosConfigThemoviedb = () => {
  axios.interceptors.request.use(
    async (reqConfig) => {
      const token = "YOUR_TOKEN_FROM_THEMOVIEDB_API"

      reqConfig!.headers!.Authorization = `Bearer ${token}`

      return reqConfig
    },
    (error) => {
      Promise.reject(error)
    },
  )

  axios.defaults.baseURL = "https://api.themoviedb.org/3/"
  axios.defaults.headers.post["Content-Type"] = "application/json"
}

export default axiosConfigThemoviedb
