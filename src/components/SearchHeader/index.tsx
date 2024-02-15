import React, { useEffect, useRef } from "react"
import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

import { useDispatch, useSelector } from "react-redux"
import {
  setCurrentPage,
  setFirstLoad,
  setMovies,
  setSearchQuery,
  setTypeOfSearch,
} from "../../store/rootSlice"
import { debounce } from "lodash"
import { RootState } from "../../store/rootReducer"
import { styles } from "./style"

const SearchHeader: React.FC = () => {
  const [query, setQuery] = React.useState<string>("")

  const selectState = (state: RootState) => state.global
  const { totalResults, typeOfSearch, firstLoad } = useSelector(selectState)

  const dispatch = useDispatch()
  const queryRef = useRef(query)

  const debouncedSearch = useRef(
    debounce(async () => {
      dispatch(setMovies([]))
      dispatch(setCurrentPage(1))
      dispatch(setSearchQuery(queryRef.current))
    }, 500),
  ).current

  const onChange = (event: any) => {
    dispatch(setTypeOfSearch("search"))
    dispatch(setFirstLoad(false))
    setQuery(event.target.value)
  }

  const handleOnNowPlayingClick = async () => {
    if (typeOfSearch === "nowPlaying") return

    window.scrollTo({
      top: 0,
      behavior: "instant",
    })
    await dispatch(setTypeOfSearch("nowPlaying"))
    await dispatch(setMovies([]))
    await setQuery("")
    // await dispatch(setSearchQuery(""))
    await dispatch(setCurrentPage(1))
  }

  useEffect(() => {
    if (firstLoad) return
    queryRef.current = query
    debouncedSearch()
  }, [query])

  return (
    <AppBar color="primary" position="fixed">
      <Toolbar sx={styles.root}>
        <TextField
          sx={styles.textfield}
          value={query}
          onChange={onChange}
          placeholder="Search..."
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography>Number of results : {totalResults ?? ""}</Typography>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleOnNowPlayingClick}
        >
          {`Show${typeOfSearch === "nowPlaying" ? "ing" : ""} Now Playing`}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default SearchHeader
