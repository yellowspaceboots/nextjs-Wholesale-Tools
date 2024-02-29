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
import { GET_QUOTATIONS_BY_DATE_RANGE_WITH_CLOSEDV10 } from '../lib/queries/getQuotationsByDateRangeWithClosed'
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
  const { loading, error, data } = useQuery(GET_QUOTATIONS_BY_DATE_RANGE_WITH_CLOSEDV10, { variables: { input: { start, end } } })
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
}

IndexPage.getLayout = getLayout

export default IndexPage
