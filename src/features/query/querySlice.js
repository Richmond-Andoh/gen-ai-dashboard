// src/features/query/querySlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentQuery: '',
  queryHistory: [],
  results: null,
  isLoading: false,
  error: null
}

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.currentQuery = action.payload
    },
    submitQuery: (state) => {
      state.isLoading = true
      state.error = null
    },
    submitQuerySuccess: (state, action) => {
      state.isLoading = false
      state.results = action.payload.results
      state.queryHistory.unshift({
        query: state.currentQuery,
        timestamp: new Date().toISOString(),
        id: Date.now()
      })
    },
    submitQueryFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const { setQuery, submitQuery, submitQuerySuccess, submitQueryFailure } = querySlice.actions
export default querySlice.reducer