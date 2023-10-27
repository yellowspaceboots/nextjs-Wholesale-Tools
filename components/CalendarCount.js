import React from 'react'
import Permission from './Permission'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const CalendarCount = ({ data, handleSalesmanFilter, salesmanFilter }) => {
  const uniqueSalesmanList = [...new Set(data.map(quote => quote.salesRef.name))]
  const salesmanList = uniqueSalesmanList.map(salesman => {
    return {
      salesmanName: salesman,
      count: data.filter(quote => quote.salesRef.name === salesman).length
    }
  }).sort((a, b) => a.salesmanName.localeCompare(b.salesmanName))
  return (
    <Permission availableTo={['MANAGER']}>
      <ToggleButtonGroup size='small' value={salesmanFilter} onChange={handleSalesmanFilter}>
        {salesmanList.map(salesman => (
          <ToggleButton value={salesman.salesmanName} key={salesman.salesmanName}>{salesman.salesmanName} ({salesman.count})</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Permission>
  )
}

export default CalendarCount
