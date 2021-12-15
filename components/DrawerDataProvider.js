import React, { createContext, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { GET_QUOTATION_COUNTS } from '../lib/queries/getQuotationCounts'
import { useAuth } from './AuthProvider'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay
} from 'date-fns'

const DrawerDataContext = createContext()

const DrawerDataProvider = ({ children }) => {
  const { user } = useAuth()
  const todayDate = new Date()
  const startDay = startOfDay(todayDate).toISOString()
  const endDay = endOfDay(todayDate).toISOString()
  const startMonth = startOfMonth(todayDate).toISOString()
  const endMonth = endOfMonth(todayDate).toISOString()
  const startWeek = startOfWeek(todayDate).toISOString()
  const endWeek = endOfWeek(todayDate).toISOString()
  const input = {
    inside: user.role === 'INSIDESALES' ? user.salesRef.number : null,
    outsideSales: user.role === 'OUTSIDESALES' ? user.salesRef.number : null,
    start: startDay,
    end: endDay,
    startMonth: startMonth,
    endMonth: endMonth,
    startWeek: startWeek,
    endWeek: endWeek
  }
  console.log(input)
  const { loading, error, data } = useQuery(GET_QUOTATION_COUNTS, {
    variables: { input }
  })
  if (loading) return null
  if (error) return <p>{error.message}</p>
  const quotationCounts = data.getQuotationCounts
  console.log(quotationCounts)
  return (
    <DrawerDataContext.Provider value={{ counts: quotationCounts }}>{children}</DrawerDataContext.Provider>
  )
}

const useDrawerData = () => useContext(DrawerDataContext)

export { DrawerDataProvider, useDrawerData }
