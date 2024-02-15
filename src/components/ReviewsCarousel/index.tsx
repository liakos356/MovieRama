import { useSearchMovieReviewsQuery } from "../../store/rootSlice"
import { useSelector } from "react-redux"
import { Avatar, Box, Divider, Paper, Typography } from "@mui/material"
import { RootState } from "../../store/rootReducer"
import Carousel from "react-material-ui-carousel"
import { styles } from "./styles"

interface AuthorDetails {
  name: string
  username: string
  avatar_path: string
  rating: number
}

interface Review {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

const ReviewsCarousel = () => {
  const selectState = (state: RootState) => state.global
  const { selectedMovie } = useSelector(selectState)

  const { data } = useSearchMovieReviewsQuery(selectedMovie.id)

  const reviews = data?.results?.slice(0, 2) ?? []

  if (!reviews.length) return null

  return (
    <Box sx={styles.root}>
      <Divider sx={styles.divider} />
      <Typography variant="h4">Reviews</Typography>
      <Carousel autoPlay={false}>
        {reviews.map((review: Review, i: number) => (
          <ReviewItem key={i} review={review} />
        ))}
      </Carousel>
    </Box>
  )
}

export default ReviewsCarousel

const ReviewItem = ({ review }: { review: Review }) => {
  const avatarPath = review.author_details.avatar_path
    ? "https://image.tmdb.org/t/p/w200" + review.author_details.avatar_path
    : ""

  return (
    <Box>
      <Box sx={styles.reviewItemRoot}>
        <Avatar sx={styles.avatar} src={avatarPath} />
        <Typography sx={styles.author} variant="h6">
          {review.author}
        </Typography>
      </Box>
      <Typography variant="body2">{review.content}</Typography>
    </Box>
  )
}
