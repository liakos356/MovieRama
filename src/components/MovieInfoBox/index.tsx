import React from "react"
import { Typography, Card, CardContent, CardMedia } from "@mui/material"
import { styles } from "./styles"
import { setIsDrawerOpen, setSelectedMovie } from "../../store/rootSlice"
import { useDispatch } from "react-redux"
import { getGenreDescription } from "../../core/helpers"
import { Rating } from "@mui/material"
import fallbackPosterImage from "../../assets/poster_not_found.jpg"

export interface MovieProps {
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

const MovieInfoBox = ({ movie }: { movie: MovieProps }) => {
  const handleOnClick = () => {
    dispatch(setSelectedMovie(movie))
    dispatch(setIsDrawerOpen(true))
  }

  const posterUrl = "https://image.tmdb.org/t/p/original/" + movie.poster_path

  const dispatch = useDispatch()

  const getGenresLabel = () => {
    const genreLabel = movie.genre_ids.length > 1 ? "Genres: " : "Genre: "

    return (
      genreLabel + movie.genre_ids.map((genre) => getGenreDescription(genre))
    )
  }

  return (
    <Card style={styles.movieBox} onClick={handleOnClick}>
      <CardMedia
        component="img"
        alt={movie.original_title}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = fallbackPosterImage
        }}
        image={posterUrl}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {movie.title} ({movie.release_date})
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {getGenresLabel()}
        </Typography>

        <Rating
          name="read-only"
          value={movie.vote_average / 2}
          readOnly
          precision={0.5}
        />
        <Typography variant="body2" color="textSecondary">
          {movie.overview}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MovieInfoBox
