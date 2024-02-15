import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const size = 64
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "1em",
        right: "1em",
        width: size + "px",
        height: size + "px",
        borderRadius: size / 2 + "px",
        transition: "all 0.2s ease-in-out",
        transform: isVisible ? "scale(1)" : "scale(0)",
      }}
    >
      <ArrowUpwardIcon />
    </Button>
  )
}

export default ScrollToTopButton
