import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { visuallyHidden } from '@material-ui/system'

/*
const columns = [
  { field: 'name', headerName: 'Name', width: 170 },
  { field: 'code', headerName: 'ISO\u00a0Code', width: 100 },
  {
    field: 'population',
    headerName: 'Population',
    width: 170,
    align: 'right',
    valueFormatter: (params) => params.value.toLocaleString('en-US')
  },
  {
    field: 'size',
    headerName: 'Size\u00a0(km\u00b2)',
    width: 170,
    align: 'right',
    valueFormatter: (params) => params.value.toLocaleString('en-US')
  },
  {
    field: 'density',
    headerName: 'Density',
    width: 170,
    align: 'right',
    valueFormatter: (params) => params.value.toFixed(2)
  },
  {
    field: 'test',
    headerName: 'Test',
    width: 170,
    align: 'right',
    renderCell: (params) => <Switch checked={params.getValue('density') > 200} />
  }
]

function createData (name, code, population, size) {
  const density = population / size
  return { name, code, population, size, density }
}
*/
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}
/*
const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767)
]
*/
const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 600
  },
  sortSpan: visuallyHidden
})

const EnhancedTableHead = ({
  classes,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  columns
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.field}
            align={column.align}
            padding={column.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === column.field ? order : false}
            style={{ width: column.width }}
          >
            <TableSortLabel
              active={orderBy === column.field}
              direction={orderBy === column.field ? order : 'asc'}
              onClick={createSortHandler(column.field)}
            >
              {column.headerName}
              {orderBy === column.field
                ? (
                  <span className={classes.sortSpan}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                  )
                : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const DataTable = ({ rows, columns }) => {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(100)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Paper className={classes.root} variant='outlined'>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table' size='small'>
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            columns={columns}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row._id}
                  >
                    {columns.map((column) => {
                      const value = row[column.field]
                      const params = {
                        value,
                        getValue: name => row[name]
                      }
                      return (
                        <TableCell key={column.field} align={column.align}>
                          {column.renderCell ? column.renderCell(params) : column.valueFormatter ? column.valueFormatter(params) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 33 * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default DataTable
