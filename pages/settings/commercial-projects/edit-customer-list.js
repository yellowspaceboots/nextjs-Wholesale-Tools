import React from 'react'
import { getLayout } from '../../../components/Layout'
import customers from '../../../testApi/houstonCustomers.json'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CommercialEditCustomerToggle from '../../../components/CommercialEditCustomerToggle'
import VirtualizedTable from '../../../components/VirtualizedTable'

const EditCustomerList = () => {
  return (
    <div>
      <p>Salesman List</p>
      <VirtualizedTable />
      {/*
      <TableContainer component={Paper}>
        <Table size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Store</TableCell>
              <TableCell align='right'>Account</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Salesman</TableCell>
              <TableCell align='right'>Assignable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((row) => {
              const currentState = false
              return (
                <TableRow key={row.account}>
                  <TableCell component='th' scope='row'>
                    {row.storeNumber}
                  </TableCell>
                  <TableCell align='right'>{row.account}</TableCell>
                  <TableCell align='right'>{row.name}</TableCell>
                  <TableCell align='right'>{row.salesmanNumber}</TableCell>
                  <TableCell align='right'>
                    <CommercialEditCustomerToggle currentState={currentState} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      */}

    </div>
  )
}

EditCustomerList.getLayout = getLayout

export default EditCustomerList
