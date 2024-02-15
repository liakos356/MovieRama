import React from 'react';

import { Provider } from 'react-redux';

import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import bootstrapApp from './core/config/bootstrapApp';
import MovieResults from './screens/MovieResults';
import SearchHeader from './components/SearchHeader';
import { store } from './store/store';
import { styles } from './styles';

bootstrapApp()

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={createTheme()}>
        <Box sx={styles.app}>
          <SearchHeader />
          <MovieResults />
        </Box>
      </ThemeProvider>
    </Provider>
  )
}

export default App
