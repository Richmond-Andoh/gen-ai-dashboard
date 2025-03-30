import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Container, CssBaseline, Grid, Typography, Box } from '@mui/material'
import QueryInput from './components/QueryInput'
import QueryHistory from './components/QueryHistory'
import ResultsDisplay from './components/ResultsDisplay'

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Gen AI Analytics Dashboard
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <QueryInput />
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <QueryHistory />
          </Grid>
          <Grid item xs={12} md={8}>
            <ResultsDisplay />
          </Grid>
        </Grid>
      </Container>
    </Provider>
  )
}

export default App