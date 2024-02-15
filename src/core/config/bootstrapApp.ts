import axiosConfigThemoviedb from "../apis/TMDBAPI/axios.config"

const bootstrapApp = async () => {
  await axiosConfigThemoviedb()
}
export default bootstrapApp
