import { AxiosError } from "axios"

import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react"

const apiBaseQuery =
  (): BaseQueryFn<
    {
      api: any
    },
    unknown,
    unknown
  > =>
  async ({ api }) => {
    try {
      const result = await api
      return { data: result }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export const apiSlice = createApi({
  baseQuery: apiBaseQuery(),
  endpoints: () => ({}),
})
