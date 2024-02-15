import { useEffect } from "react"
import { Box, Grid } from "@mui/material"
import MovieInfoBox, { MovieProps } from "../../components/MovieInfoBox"

import {
  setCurrentPage,
  setFirstLoad,
  setMovies,
  setTotalResults,
  useNowPlayingMoviesQuery,
  useSearchMoviesQuery,
} from "../../store/rootSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/rootReducer"
import LinearProgress from "@mui/material/LinearProgress"

import NoResultsPage from "../NoResults"
import WelcomePage from "../Welcome"
import MovieDetails from "../../components/MovieDetails"
import { styles } from "./styles"
import useInfiniteScroll from "react-infinite-scroll-hook"
import ScrollToTopButton from "./subcomponents/ScrollOnTopButton"

const MovieResults = () => {
  const selectState = (state: RootState) => state.global
  const {
    movies,
    searchQuery,
    firstLoad,
    totalResults,
    currentPage,
    typeOfSearch,
  } = useSelector(selectState)

  const dispatch = useDispatch()

  const { data, isFetching, isError } =
    typeOfSearch === "search"
      ? useSearchMoviesQuery({
          query: searchQuery.trim(),
          page: currentPage,
        })
      : useNowPlayingMoviesQuery(currentPage)

  const incrementPage = () => {
    dispatch(setCurrentPage(currentPage + 1))
  }

  const hasNextPage = totalResults > movies.length

  const [sentryRef] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage,
    onLoadMore: incrementPage,
    disabled: isError,
    rootMargin: "0px 0px 400px 0px",
  })

  useEffect(() => {
    if (isFetching) return

    searchQuery !== "" && dispatch(setFirstLoad(false))

    dispatch(setTotalResults(data?.total_results ?? 0))
    if (data?.results) {
      dispatch(setMovies(movies.concat(data.results)))
    }
  }, [searchQuery, data])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    })
    if (isFetching) return
  }, [searchQuery])

  if (firstLoad && typeOfSearch === "search") {
    return <WelcomePage />
  }

  return (
    <Box sx={styles.root}>
      {movies.length > 0 ? (
        <Box sx={styles.root}>
          <MovieDetails />
          <ScrollToTopButton />
          <Box sx={styles.container}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {movies.map((movie: MovieProps, index: number) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <MovieInfoBox movie={movie} />
                </Grid>
              ))}
              {(isFetching || hasNextPage) && (
                <LinearProgress sx={styles.progressIndicator} ref={sentryRef} />
              )}
            </Grid>
          </Box>
        </Box>
      ) : (
        <NoResultsPage />
      )}
    </Box>
  )
}

export default MovieResults
