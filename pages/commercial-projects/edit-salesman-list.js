import React, { useState, useEffect } from 'react'
import { getLayout } from '../../components/Layout'
import salesmen from '../../testApi/salesmen.json'
import CommercialEditSalesmanToggle from '../../components/CommercialEditSalesmanToggle'
import { DataGrid } from '@material-ui/data-grid'
import TextField from '@material-ui/core/TextField'

const EditSalesmanList = () => {
  const rows = salesmen.map(salesman => {
    return {
      ...salesman,
      id: salesman.number,
      search: `${salesman.number} ${salesman.name}`
    }
  })
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  const columns = [
    { field: 'number', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 400 },
    { field: 'type', headerName: 'Type', width: 130 },
    {
      field: 'store',
      headerName: 'Store',
      width: 130,
      valueFormatter: (params) => zeroPad(params.value, 4)
    },
    {
      field: 'used',
      headerName: 'Used',
      renderCell: () => <CommercialEditSalesmanToggle currentState={false} />
    }
  ]
  return (
    <>
      <p>Salesman List</p>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={100} disableSelectionOnClick />
      </div>
    </>
  )
}

EditSalesmanList.getLayout = getLayout

export default EditSalesmanList
