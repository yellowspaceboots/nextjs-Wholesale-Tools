import React from 'react'
import {
  format,
  parseISO
} from 'date-fns'
import exportFromJSON from 'export-from-json'
import DataTable from './TableTest'
import Link from './Link'

const Analytics = ({ data, start, end }) => {
  const customers = data.getQuotationsByDateRangeWithClosed.data.map((event) => {
    const eventObj = {
      _id: event._id,
      Quote: event.requestId,
      'Job Name': event.title,
      Status: event.status,
      Size: event.size,
      'Date Entered': format(parseISO(event.dateEntered), 'MM/dd/yyyy'),
      'Date Due': format(parseISO(event.dateDue), 'MM/dd/yyyy'),
      'Assigned Name': event.salesRef.name,
      'Assigned Number': event.salesRef.number
    }
    const customerList = event.customerList.data.map((customer) => {
      const customerObj = {
        customerId: customer.customerRef._id,
        'Customer Account': customer.customerRef.account,
        'Customer Name': customer.customerRef.name,
        'Customer Amount': customer.amount,
        'Customer Status': customer.status
      }
      return { ...eventObj, ...customerObj }
    })
    return customerList
  })
  const merged = [].concat.apply([], customers)
  const unique = [...new Set(merged.map((item) => item['Customer Account']))].map(item => {
    const custObj = merged.find(job => job['Customer Account'] === item)
    const totalCount = merged.filter(job => job['Customer Account'] === item).length
    const totalWon = merged.filter(job => job['Customer Account'] === item && job['Customer Status'] === 'Won').length
    const totalOpen = merged.filter(job => job['Customer Account'] === item && job['Customer Status'] === 'Open').length
    const totalPending = merged.filter(job => job['Customer Account'] === item && job['Customer Status'] === 'Pending').length
    const totalLost = merged.filter(job => job['Customer Account'] === item && job['Customer Status'] === 'Lost').length
    const percent = Math.round((100 * totalWon) / totalCount)
    const test = {
      customerId: custObj.customerId,
      customerAccount: item,
      customerName: custObj['Customer Name'],
      totalJobCount: totalCount,
      totalOpen: totalOpen,
      totalWonCount: totalWon,
      totalPending: totalPending,
      totalLost: totalLost,
      percentWonToQuote: `${percent}%`
    }
    return test
  })
  const columns = [
    {
      field: 'customerAccount',
      headerName: 'Account Number',
      width: 40,
      // eslint-disable-next-line react/display-name
      renderCell: (params) => (
        <Link href={`/settings/commercial-projects/edit-customer-list/${params.getValue('customerId')}`} variant='body2'>
          {params.value}
        </Link>
      )
    },
    { field: 'customerName', headerName: 'Customer Name', width: 300 },
    {
      field: 'totalJobCount',
      headerName: 'Total Jobs Quoted',
      width: 50,
      // eslint-disable-next-line react/display-name
      renderCell: (params) => (
        <Link href={`/quotations?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&account=${params.getValue('customerAccount')}`} variant='body2'>
          {params.value}
        </Link>
      )
    },
    { field: 'totalOpen', headerName: 'Total Jobs Open', width: 50 },
    { field: 'totalPending', headerName: 'Total Jobs Pending', width: 50 },
    { field: 'totalWonCount', headerName: 'Total Jobs Won', width: 50 },
    { field: 'totalLost', headerName: 'Total Jobs Lost', width: 50 },
    { field: 'percentWonToQuote', headerName: 'Won/Quote', width: 40 }
  ]
  const fileName = 'download'
  const exportType =  exportFromJSON.types.csv
  return (
    <>
      <button onClick={() => exportFromJSON({ data: merged, fileName, exportType })}>Export</button>
      <DataTable
        rows={unique}
        columns={columns}
      />
    </>
  )
}

export default Analytics
