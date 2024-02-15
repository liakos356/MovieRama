import { useDispatch, useSelector } from "react-redux"
import {
  setIsDrawerOpen,
  useSearchMovieByIDQuery,
  useSearchMovieTrailerQuery,
} from "../../store/rootSlice"
import fallbackPosterImage from "../../assets/poster_not_found.jpg"

import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  Typography,
} from "@mui/material"
import { RootState } from "../../store/rootReducer"
import { MovieDetailed } from "./types"
import { styles } from "./styles"
import ReviewsCarousel from "../ReviewsCarousel"
import SimilarCarousel from "../SimilarCarousel"

const MovieDetails = () => {
  const selectState = (state: RootState) => state.global
  const { isDrawerOpen, selectedMovie } = useSelector(selectState)

  const dispatch = useDispatch()
  const toggleDrawer = (isOpen: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    dispatch(setIsDrawerOpen(isOpen))
  }

  const {
    data,
    isFetching,
    isError,
  }: {
    data?: MovieDetailed
    isFetching: boolean
    isError: boolean
  } = useSearchMovieByIDQuery({
    movie_id: selectedMovie.id,
  })

  const getTrailerUrl = (videos: any) => {
    if (!videos) return ""

    const result = videos.find((video: any) => video.type === "Trailer") ?? ""

    if (result !== "") return `https://www.youtube.com/embed/${result.key}`

    return result
  }

  const trailerDetails = useSearchMovieTrailerQuery(selectedMovie.id)

  const movieDetails = data

  const trailerUrl = getTrailerUrl(trailerDetails?.data?.results)

  const posterUrl =
    "https://image.tmdb.org/t/p/original/" + movieDetails?.poster_path

  const POSTER_MULTIPLIER = 38

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
      <Box
        style={styles.container}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {isFetching ? (
          <CircularProgress />
        ) : isError ? (
          <Typography variant="h6">Error fetching movie details</Typography>
        ) : (
          <Box sx={styles.contents}>
            <img
              src={posterUrl}
              alt={movieDetails?.tagline}
              style={{ width: "100%", height: "auto" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src = fallbackPosterImage
              }}
            />

            <Typography variant="h2">{movieDetails?.title}</Typography>

            {!!movieDetails?.tagline && <Divider sx={styles.divider} />}
            <Typography variant="h5">{movieDetails?.tagline}</Typography>

            {!!movieDetails?.overview && (
              <Divider variant="fullWidth" sx={styles.divider} />
            )}

            {!!movieDetails?.overview && (
              <Box>
                <Typography variant="h6">Synopsis :</Typography>
                <Typography variant="body1">
                  {movieDetails?.overview}
                </Typography>
              </Box>
            )}

            <ReviewsCarousel />

            <SimilarCarousel />

            {!!trailerUrl && (
              <Box>
                <Divider sx={styles.divider} />
                <iframe
                  width={16 * POSTER_MULTIPLIER}
                  height={9 * POSTER_MULTIPLIER}
                  src={trailerUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  // allowfullscreen
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Drawer>
  )
}

export default MovieDetails
