import { useSearchSimilarMoviesQuery } from "../../store/rootSlice"
import { useSelector } from "react-redux"
import { Box, Card, Divider, Rating, Typography } from "@mui/material"
import { RootState } from "../../store/rootReducer"
import Carousel from "react-material-ui-carousel"
import { styles } from "./styles"
import fallbackPosterImage from "../../assets/poster_not_found.jpg"
interface SimilarMovie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

const SimilarCarousel = () => {
  const selectState = (state: RootState) => state.global
  const { selectedMovie } = useSelector(selectState)

  const { data } = useSearchSimilarMoviesQuery(selectedMovie.id)

  const similarMovies = data?.results ?? []

  const getSimilarMoviesRows = () => {
    const rows = []
    let i = 0
    let j = 0
    while (i < similarMovies.length) {
      const row = similarMovies.slice(i, i + 3)
      rows.push(row)
      i += 5
      j++
    }
    return rows
  }

  const rows = getSimilarMoviesRows()

  if (!rows.length) return null

  return (
    <Box sx={styles.root}>
      <Divider sx={styles.divider} />
      <Typography variant="h4">Similar Movies:</Typography>
      <Carousel navButtonsAlwaysVisible={true} stopAutoPlayOnHover={true}>
        {rows.map((row: SimilarMovie[], i: number) => (
          <SimilarMovieRow key={i} similarMovieRow={row} />
        ))}
      </Carousel>
    </Box>
  )
}

export default SimilarCarousel

const SimilarMovieRow = ({
  similarMovieRow,
}: {
  similarMovieRow: SimilarMovie[]
}) => {
  return (
    <Box sx={styles.similarMoviesRow}>
      {similarMovieRow.map((similarMovie: SimilarMovie) => (
        <Card sx={styles.containerCard}>
          <img
            style={{
              objectFit: "cover",
              width: "auto",
              height: "200px",
              margin: "4px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            src={"https://image.tmdb.org/t/p/w200" + similarMovie.poster_path}
            alt={similarMovie.title}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null
              target.src = fallbackPosterImage
            }}
          />

          <Typography
            sx={styles.similarMovie}
            textAlign="center"
            variant="body2"
          >
            {similarMovie.title}
          </Typography>
          <Rating
            sx={styles.rating}
            name="read-only"
            value={similarMovie.vote_average / 2}
            readOnly
            precision={0.5}
          />
        </Card>
      ))}
    </Box>
  )
}
