import React from "react"
import { Container, Typography } from "@mui/material"
import { styles } from "./styles"

const WelcomePage = () => {
  return (
    <Container sx={styles.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the MovieRama
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the movies
      </Typography>
    </Container>
  )
}

export default WelcomePage
