import React from 'react'
import { useSelector } from 'react-redux'
import { List, ListItem, ListItemText, Typography, Divider, Paper } from '@mui/material'
import { History } from '@mui/icons-material'

const QueryHistory = () => {
  const { queryHistory } = useSelector((state) => state.query)

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <History sx={{ mr: 1 }} /> Query History
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      {queryHistory.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No queries yet. Ask a question!
        </Typography>
      ) : (
        <List>
          {queryHistory.map((item) => (
            <ListItem key={item.id} sx={{ py: 1 }}>
              <ListItemText 
                primary={item.query} 
                secondary={new Date(item.timestamp).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  )
}

export default QueryHistory