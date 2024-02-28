import React, { useState } from 'react'
import { getLayout } from '../../../components/Layout'
import CommercialEditSalesmanToggle from '../../../components/CommercialEditSalesmanToggle'
import TextField from '@mui/material/TextField'
import { GET_ALL_SALESMENV10 } from '../../../lib/queries/getAllSalesmen'
import { useQuery, useMutation } from '@apollo/client'
import { UPDATE_SALESMANV10 } from '../../../lib/mutations/updateSalesman'
import DataTable from '../../../components/TableTest'

const EditSalesmanList = () => {
  const [updateError, setUpdateError] = useState(1)
  const [search, setSearch] = useState('')
  const handleChange = (event) => {
    setSearch(event.target.value)
  }
  const [updateSalesman, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_SALESMANV10, {
    onError: (error) => {
      setUpdateError(error)
    }
  })
  const { loading, error, data } = useQuery(GET_ALL_SALESMENV10)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const rows = data.getAllSalesmenV10.map(salesman => {
    return {
      ...salesman,
      _id: salesman.id,
      id: salesman.number,
      search: `${salesman.number} ${salesman.name}`,
      used: salesman.usedByCommercial
    }
  }).filter(salesman => search === '' || salesman.search.toLowerCase().includes(search.toLowerCase()))
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
      headerName: 'Assignable',
      // eslint-disable-next-line react/display-name
      renderCell: (params) => <CommercialEditSalesmanToggle id={params.getValue('_id')} currentState={Boolean(params.value)} updateSalesman={updateSalesman} />
    }
  ]
  return (
    <>
      <p>Salesman List</p>
      <TextField
        autoComplete='off'
        variant='outlined'
        name='filter'
        id='filter'
        label='Filter'
        fullWidth
        value={search}
        onChange={handleChange}
        margin='dense'
      />
      <DataTable
        rows={rows}
        columns={columns}
      />
    </>
  )
}

EditSalesmanList.getLayout = getLayout

export default EditSalesmanList
