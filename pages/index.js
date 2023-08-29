import React from 'react'
import { getLayout } from '../components/Layout'
import { useAuth } from '../components/AuthProvider'
import ManagerDashboard from '../components/ManagerDashboard'
import { useRouter } from 'next/router'
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth
} from 'date-fns'
import { GET_QUOTATIONS_BY_DATE_RANGE_WITH_CLOSED } from '../lib/queries/getQuotationsByDateRangeWithClosed'
import { useQuery } from '@apollo/client'

const IndexPage = () => {
  const { user } = useAuth()
  const router = useRouter()
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth() + 1
  const todayDay = today.getDate()
  const myYear = router.query?.year ? router.query.year : todayYear
  const myMonth = router.query?.month ? router.query.month : todayMonth
  const myDay = router.query?.day ? router.query.day : todayDay
  const viewDate = new Date(myYear, myMonth - 1, myDay, 0, 0, 0, 0)
  const nextViewDate = addMonths(viewDate, 1)
  const previousViewDate = subMonths(viewDate, 1)
  const title = format(viewDate, 'MMMM yyyy')
  const start = startOfMonth(viewDate)
  const end = endOfMonth(viewDate)
  const { loading, error, data } = useQuery(GET_QUOTATIONS_BY_DATE_RANGE_WITH_CLOSED, { variables: { input: { start, end } } })
  switch (user.role) {
    case 'MANAGER':
      return (
        <ManagerDashboard
        viewDate={viewDate}
        nextViewDate={nextViewDate}
        previousViewDate={previousViewDate}
        title={title}
        data={data}
        error={error}
        loading={loading}
        start={start}
        end={end}
        />
      )
    case 'INSIDESALES':
      return (
        <div>Inside Sales Dashboard coming soon.</div>
      )
    case 'OUTSIDESALES':
      return (
        <div>Outside Sales Dashboard coming soon.</div>
      )
    default:
      return null
  }
}

IndexPage.getLayout = getLayout

export default IndexPage
