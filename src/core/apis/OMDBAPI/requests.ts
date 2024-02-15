import API from "../"

export type SearchParameters = {
  s: string // Required, Movie title to search for
  type?: "movie" | "series" | "episode" // Optional, Type of result to return
  y?: string // Optional, Year of release
  r?: "json" | "xml" // Optional, The data type to return (default: 'json')
  page?: number // Optional, Page number to return (1-100)
  callback?: string // Optional, JSONP callback name
  v?: number // Optional, API version (reserved for future use, default: 1)
}

export type SearchByIDOrTitle = {
  i?: string // Optional, A valid IMDb ID (e.g., tt1285016)
  t?: string // Optional, Movie title to search for.
  type?: "movie" | "series" | "episode" // Optional, Type of result to return.
  y?: string // Optional, Year of release.
  plot?: "short" | "full" // Optional, Return short or full plot (default: 'short').
  r?: "json" | "xml" // Optional, The data type to return (default: 'json').
  callback?: string // Optional, JSONP callback name.
  v?: number // Optional, API version (default: 1, reserved for future use).
}

// Function to search for movies by title

export async function searchMovies({
  s,
  type,
  y,
  r,
  page,
  callback,
  v,
}: SearchParameters) {
  const response = await API.get("", {
    params: {
      s,
      type,
      y,
      r,
      page,
      callback,
      v,
    },
  })
  return response.data
}

export async function searchMoviesByIDOrTitle({
  i,
  t,
  type,
  y,
  plot,
  r,
  callback,
  v,
}: SearchByIDOrTitle) {
  const response = await API.get("", {
    params: {
      i,
      t,
      type,
      y,
      plot,
      r,
      callback,
      v,
    },
  })
  return response.data
}
