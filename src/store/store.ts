import createSagaMiddleware from "redux-saga"

import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query/react"

import { apiSlice } from "./queryApi"
import rootReducer from "./rootReducer"

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, apiSlice.middleware]

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(...middlewares),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
