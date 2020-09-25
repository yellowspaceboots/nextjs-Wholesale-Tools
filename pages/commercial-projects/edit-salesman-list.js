import React from 'react'
import { getLayout } from '../../components/Layout'
import salesmen from '../../testApi/salesmen.json'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CommercialEditSalesmanToggle from '../../components/CommercialEditSalesmanToggle'

const EditSalesmanList = () => {
  return (
    <div>
      <p>Salesman List</p>
      <TableContainer component={Paper} style={{ height: '80vh' }}>
        <Table size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Number</TableCell>
              <TableCell align='right'>Type</TableCell>
              <TableCell align='right'>Store</TableCell>
              <TableCell align='right'>Assignable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesmen.map((row) => {
              const currentState = false
              return (
                <TableRow key={row.number}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='right'>{row.number}</TableCell>
                  <TableCell align='right'>{row.type}</TableCell>
                  <TableCell align='right'>{row.store}</TableCell>
                  <TableCell align='right'>
                    <CommercialEditSalesmanToggle currentState={currentState} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

EditSalesmanList.getLayout = getLayout

export default EditSalesmanList
