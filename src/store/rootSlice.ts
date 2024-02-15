import { createSlice } from '@reduxjs/toolkit';

import { apiSlice } from './queryApi';
import {
  SearchByIDOrTitle, searchMovieReviews,
  searchMovies, searchMoviesByIDOrTitle,
  searchMovieTrailer, searchNowPlaying,
  SearchParameters, searchSimilarMovies,
} from '../core/apis/TMDBAPI/requests';

export type initialState = {
  searchQuery: string
  firstLoad: boolean
  movies: any[]
  selectedMovie: any
  isDrawerOpen: boolean
  currentPage: number
  totalResults: number
  typeOfSearch: "search" | "nowPlaying"
}

const initialState: initialState = {
  searchQuery: "",
  firstLoad: true,
  movies: [],
  selectedMovie: {},
  isDrawerOpen: false,
  currentPage: 1,
  totalResults: 0,
  typeOfSearch: "nowPlaying",
}

const rootSlice: any = createSlice({
  name: "globals",
  initialState,

  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },

    setFirstLoad: (state, action) => {
      state.firstLoad = action.payload
    },

    setIsDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload
    },

    setTypeOfSearch: (state, action) => {
      state.typeOfSearch = action.payload
    },

    setMovies: (state, action) => {
      state.movies = action.payload
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload
    },

    setTotalResults: (state, action) => {
      state.totalResults = action.payload
    },
  },
})

export const rootApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchMovieByID: builder.query<any, SearchByIDOrTitle>({
      query: (params: SearchByIDOrTitle) => ({
        api: searchMoviesByIDOrTitle(params),
      }),

      keepUnusedDataFor: 5,
    }),
    searchMovies: builder.query<any, SearchParameters>({
      query: (params: SearchParameters) => ({
        api: searchMovies(params),
      }),
    }),

    nowPlayingMovies: builder.query<any, any>({
      query: (page: number) => ({
        api: searchNowPlaying({ page }),
      }),
    }),

    searchMovieTrailer: builder.query<any, any>({
      query: (movie_id: string) => ({
        api: searchMovieTrailer(movie_id),
      }),
    }),
    searchMovieReviews: builder.query<any, any>({
      query: (movie_id: string) => ({
        api: searchMovieReviews(movie_id),
      }),
    }),
    searchSimilarMovies: builder.query<any, any>({
      query: (movie_id: string) => ({
        api: searchSimilarMovies(movie_id),
      }),
    }),
  }),
})

export const {
  useSearchMovieByIDQuery,
  useSearchMoviesQuery,
  useNowPlayingMoviesQuery,
  useSearchMovieTrailerQuery,
  useSearchMovieReviewsQuery,
  useSearchSimilarMoviesQuery,
} = rootApiSlice

export const {
  setSearchQuery,
  setTypeOfSearch,
  setMovies,
  setFirstLoad,
  setCurrentPage,
  setSelectedMovie,
  setTotalResults,
  setIsDrawerOpen,
} = rootSlice.actions

export default rootSlice.reducer
