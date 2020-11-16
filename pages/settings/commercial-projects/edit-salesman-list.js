import React, { useState, useEffect } from 'react'
import { getLayout } from '../../../components/Layout'
import CommercialEditSalesmanToggle from '../../../components/CommercialEditSalesmanToggle'
import { DataGrid } from '@material-ui/data-grid'
import TextField from '@material-ui/core/TextField'
import { GET_ALL_SALESMEN } from '../../../testApi/queries/getAllSalesmen'
import { useQuery } from '@apollo/client'

const EditSalesmanList = () => {
  const [page, setPage] = useState(1)
  const { loading, error, data } = useQuery(GET_ALL_SALESMEN)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const rows = data.getAllSalesmen.data.map(salesman => {
    return {
      ...salesman,
      id: salesman.number,
      search: `${salesman.number} ${salesman.name}`,
      used: salesman.usedByCommercial
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
      renderCell: (params) => <CommercialEditSalesmanToggle currentState={params.value} />
    }
  ]
  return (
    <>
      <p>Salesman List</p>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={100}
          disableSelectionOnClick
          page={page}
          rowHeight={30}
          onPageChange={(params) => {
            setPage(params.page)
          }}
        />
      </div>
    </>
  )
}

EditSalesmanList.getLayout = getLayout

export default EditSalesmanList
