import React from 'react'
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const ChartVisualization = ({ data, type }) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={chartOptions} />
      case 'pie':
        return <Pie data={data} options={chartOptions} />
      case 'bar':
      default:
        return <Bar data={data} options={chartOptions} />
    }
  }

  return (
    <Box sx={{ height: '400px', mt: 2 }}>
      {renderChart()}
    </Box>
  )
}

export default ChartVisualization