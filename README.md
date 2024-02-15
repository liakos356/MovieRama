# MovieRama

MovieRama is a client-side single-page application that serves as a movie catalog, allowing users to browse movies currently playing in theaters, search for movies, and view detailed information about them. This project is built using React, Material UI, and TypeScript.

## Features

- **In Theaters**: Displays a list of movies now playing in theaters with infinite scrolling. Each movie includes basic information like the poster, title, release year, genres, vote average, and an overview.
- **Search for Movies**: Users can search for movies using a dynamic search feature. This also implements infinite scrolling for search results.
- **Movie Details**: On selecting a movie, users can view more detailed information, including video trailers, reviews, and similar movies.

## Installation

1. To install the application, clone the repository and install dependencies:

\`\`\`bash
git clone [repository-url]
cd movierama
npm install
\`\`\`

## Usage

Start the development server:

\`\`\`bash
npm start
\`\`\`

## API Reference

This project uses The Movie DB (MDB) JSON API. Relevant endpoints include:

- \`/movie/now_playing\`
- \`/genre/movie/list\`
- \`/search/movie\`
- \`/movie/{movie_id}\`
- \`/movie/{movie_id}/videos\`
- \`/movie/{movie_id}/reviews\`
- \`/movie/{movie_id}/similar\`

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page] if you want to contribute.
