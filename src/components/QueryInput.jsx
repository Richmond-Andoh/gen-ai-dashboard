import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery, submitQuery } from '../features/query/querySlice'
import { TextField, Box, List, ListItem, ListItemText, Paper } from '@mui/material'
import { Search } from '@mui/icons-material'

const QueryInput = () => {
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const dispatch = useDispatch()
  const { currentQuery } = useSelector((state) => state.query)

  useEffect(() => {
    if (currentQuery.length > 2) {
      const mockSuggestions = [
        `${currentQuery} by region`,
        `${currentQuery} over time`,
        `Compare ${currentQuery} with last year`
      ]
      setSuggestions(mockSuggestions)
    } else {
      setSuggestions([])
    }
  }, [currentQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(submitQuery())
    
    setTimeout(() => {
      const mockResults = {
        data: generateMockData(currentQuery),
        visualizationType: determineVisualizationType(currentQuery)
      }
      dispatch({ type: 'query/submitQuerySuccess', payload: { results: mockResults } })
    }, 1500)
  }

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask a business question (e.g., 'Sales last quarter')"
          value={currentQuery}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1 }} />
          }}
        />
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <Paper sx={{ position: 'absolute', width: '100%', zIndex: 1, mt: 1 }}>
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItem 
                key={index}
                button
                onClick={() => {
                  dispatch(setQuery(suggestion))
                  setShowSuggestions(false)
                }}
              >
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  )
}

const generateMockData = (query) => {
  if (query.includes('sales')) {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Sales 2023',
        data: [12000, 19000, 15000, 18000, 21000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)'
      }]
    }
  } else if (query.includes('customer')) {
    return {
      labels: ['Satisfied', 'Neutral', 'Unsatisfied'],
      datasets: [{
        label: 'Customer Satisfaction',
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ]
      }]
    }
  } else {
    return {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{
        label: 'Business Metrics',
        data: [500, 600, 700, 800],
        backgroundColor: 'rgba(153, 102, 255, 0.2)'
      }]
    }
  }
}

const determineVisualizationType = (query) => {
  if (query.includes('trend') || query.includes('over time')) return 'line'
  if (query.includes('compare')) return 'bar'
  if (query.includes('distribution')) return 'pie'
  return 'bar'
}

export default QueryInput