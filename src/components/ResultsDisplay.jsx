import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography, CircularProgress, Alert, Paper } from '@mui/material'
import ChartVisualization from './ChartVisualization'

const ResultsDisplay = () => {
  const { results, isLoading, error } = useSelector((state) => state.query)

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Results
      </Typography>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Analyzing your query...
          </Typography>
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : results ? (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            AI-generated insights:
          </Typography>
          <ChartVisualization data={results.data} type={results.visualizationType} />
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Submit a query to see results.
        </Typography>
      )}
    </Paper>
  )
}

export default ResultsDisplay