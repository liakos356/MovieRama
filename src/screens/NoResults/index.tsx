import { Box, CircularProgress, Container, Typography } from "@mui/material"
import React from "react"
import { styles } from "./styles"
import {
  useNowPlayingMoviesQuery,
  useSearchMovieByIDQuery,
} from "../../store/rootSlice"
import { useSelector } from "react-redux"
import { RootState } from "../../store/rootReducer"

const NoResultsPage = () => {
  const selectState = (state: RootState) => state.global
  const { currentPage, searchQuery } = useSelector(selectState)

  const isFetchingNowPlaying = useNowPlayingMoviesQuery(currentPage)
  const isFetchingSearch = useSearchMovieByIDQuery({ movie_id: searchQuery })

  const isFetching =
    isFetchingNowPlaying.isFetching || isFetchingSearch.isFetching

  if (isFetching) {
    return (
      <Box sx={styles.loadingRoot}>
        <CircularProgress size={150} />
        <Typography variant="h4" component="h1" gutterBottom>
          Loading...
        </Typography>
      </Box>
    )
  }

  return (
    <Container sx={styles.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        No Results Found
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        We couldn't find what you were looking for.
      </Typography>
    </Container>
  )
}

export default NoResultsPage
