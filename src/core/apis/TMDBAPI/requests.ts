import API from '../';

export interface SearchParameters {
  query: string
  include_adult?: boolean
  language?: string
  primary_release_year?: string
  page?: number
  region?: string
  year?: string
}

export interface SearchByIDOrTitle {
  movie_id: string
}

export type NowPlaying = {
  page: number // Optional, API version (default: 1, reserved for future use).
}

// Function to search for movies by title

export async function searchMovies({
  query,
  include_adult,
  language,
  primary_release_year,
  page,
  region,
  year,
}: SearchParameters) {
  const response = await API.get("search/movie", {
    params: {
      query,
      include_adult,
      language,
      primary_release_year,
      page,
      region,
      year,
    },
  })
  return response.data
}

export async function searchMoviesByIDOrTitle({ movie_id }: SearchByIDOrTitle) {
  if (!movie_id) return
  const response = await API.get(`/movie/${movie_id}`)
  return response.data
}

export async function searchNowPlaying({ page }: NowPlaying) {
  if (!page) return
  const response = await API.get("movie/now_playing", {
    params: {
      page,
    },
  })
  return response.data
}

export async function searchMovieTrailer(movie_id: string) {
  if (!movie_id) return

  const response = await API.get(`movie/${movie_id}/videos?language=en-US`)
  return response.data
}

export async function searchMovieReviews(movie_id: string) {
  if (!movie_id) return

  const response = await API.get(`movie/${movie_id}/reviews?language=en-US`)
  return response.data
}

export async function searchSimilarMovies(movie_id: string) {
  if (!movie_id) return

  const response = await API.get(`movie/${movie_id}/similar?language=en-US`)
  return response.data
}
