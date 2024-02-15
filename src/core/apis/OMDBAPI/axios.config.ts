import axios from "axios"

const axiosConfigOmdbapi = () => {
  axios.defaults.baseURL = "http://www.omdbapi.com/?"
  axios.defaults.params = {
    apikey: "YOUR_API_KEY_FROM_OMDBAPI",
  }
  axios.defaults.headers.post["Content-Type"] = "application/json"
}

export default axiosConfigOmdbapi
