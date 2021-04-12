import React, { useState } from 'react'
import { getLayout } from '../../../../components/Layout'
import CommercialEditCustomerToggle from '../../../../components/CommercialEditCustomerToggle'
import TextField from '@material-ui/core/TextField'
import { GET_ALL_CUSTOMERS } from '../../../../lib/queries/getAllCustomers'
import { useQuery, useMutation } from '@apollo/client'
import { UPDATE_CUSTOMERS } from '../../../../lib/mutations/updateCustomer'
import DataTable from '../../../../components/TableTest'
import Link from '../../../../components/Link'

const EditCustomerList = () => {
  const [updateError, setUpdateError] = useState(1)
  const [search, setSearch] = useState('')
  const handleChange = (event) => {
    setSearch(event.target.value)
  }
  const [updateCustomers, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_CUSTOMERS, {
    onError: (error) => {
      setUpdateError(error)
    }
  })
  const { loading, error, data } = useQuery(GET_ALL_CUSTOMERS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const rows = data.getAllCustomers.data.map(customer => {
    const salesman = customer.salesRef ? customer.salesRef.name : ''
    return {
      ...customer,
      id: customer.account,
      search: `${customer.account} ${customer.name} ${salesman}`,
      used: customer.usedByCommercial,
      salesman: salesman
    }
  }).filter(customer => search === '' || customer.search.toLowerCase().includes(search.toLowerCase()))
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  const columns = [
    {
      field: 'account',
      headerName: 'Account',
      width: 80,
      renderCell: (params) => (
        <Link href={`edit-customer-list/${params.getValue('_id')}`} variant='body2'>
          {params.value}
        </Link>
      )
    },
    {
      field: 'storeNumber',
      headerName: 'Store',
      width: 130,
      valueFormatter: (params) => zeroPad(params.value, 4)
    },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'salesman', headerName: 'Salesman', width: 300 },
    {
      field: 'used',
      headerName: 'Assignable',
      renderCell: (params) => <CommercialEditCustomerToggle id={params.getValue('_id')} currentState={Boolean(params.value)} updateCustomers={updateCustomers} />
    }
  ]
  return (
    <>
      <p>Customer List</p>
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

EditCustomerList.getLayout = getLayout

export default EditCustomerList
