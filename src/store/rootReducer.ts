import { combineReducers } from "@reduxjs/toolkit"

import { apiSlice } from "./queryApi"
import rootSlice from "./rootSlice"

export const appReducer = combineReducers({
  global: rootSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_REDUX") state = undefined
  return appReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
