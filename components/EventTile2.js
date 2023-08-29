import React, { useMemo } from 'react'
import { getStatusColor, getStatusFontColor, amountShortFormat, pad } from '../lib/utils'
import DateIcon from './DateIcon'
import { NextLinkComposed } from './Link'
import Box from '@mui/material/Box'

const EventTile = ({ event }) => (
  useMemo(() => {
    const quotedCustomerList = event.customerList.data.filter(customer => customer.amount && customer.amount > 0)
    const totalAmount = quotedCustomerList.reduce((acc, obj) => acc + obj.amount, 0)
    const avgAmount = quotedCustomerList.length === 0 ? 0 : Math.round(totalAmount / quotedCustomerList.length)
    return (
      <>
        <Box
          sx={{
            py: 2,
            width: '100%',
            mr: 2,
            pr: 1,
            borderTop: '1px lightgrey solid',
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <DateIcon event={event} status />
          <Box sx={{ flexDirection: 'column', flexGrow: 1 }}>
            <Box sx={{ color: 'text.primary', fontSize: 20, fontWeight: 'bold', minWidth: 400 }}>
            <NextLinkComposed to={`/quotations/${event._id}`} style={{color: '#1e3f76'}}>
              {event.title}
              </NextLinkComposed>
            </Box>
            <Box sx={{ flexDirection: 'column', flexGrow: 1 }}>
            {event.description
              ? (
                <Box sx={{ color: 'text.primary', fontSize: 16, maxWidth: 800 }}>
                  {event.description}
                </Box>
                )
              : (
                <Box sx={{ color: 'text.secondary', fontSize: 16, fontStyle: 'italic' }}>
                  Edit to add Description
                </Box>)}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, mt: 1 }}>
              <Box sx={{ borderRadius: 1.3, fontSize: 14, px: 0.5, bgcolor: 'lightgrey' }}>Assigned To: {event.salesRef.name}</Box>
            </Box>
          </Box>
          </Box>
          <Box sx={{ flexDirection: 'column' }}>
            {event.customerList.data.map(customer => {
              const customerStatusColor = getStatusColor(customer.status)
              const customerStatusFontColor = getStatusFontColor(customer.status)
              const customerAmount = customer.amount ? customer.amount : 0
              const customerFormattedAmount = amountShortFormat(customerAmount)
              return (
                <Box key={customer.customerRef.account} sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
                <NextLinkComposed to={`/settings/commercial-projects/edit-customer-list/${customer.customerRef._id}`} style={{textDecoration: 'none'}}>
                  <Box
                    sx={{
                      flexGrow: 1,
                      borderRadius: 1.3,
                      fontSize: 14,
                      my: 0.25,
                      px: 0.5,
                      bgcolor: customerStatusColor,
                      color: customerStatusFontColor
                    }}
                  >
                    {customer.customerRef.name}
                  </Box>
                  </NextLinkComposed>
                  <Box
                    sx={{
                      flexGrow: 1,
                      borderRadius: 1.3,
                      fontSize: 14,
                      my: 0.25,
                      px: 0.5,
                      bgcolor: 'lightgray',
                    }}
                  >
                    {customer.customerRef.salesRef.name}
                  </Box>
                  <Box
                    sx={{
                      borderRadius: 1.3,
                      fontSize: 14,
                      my: 0.25,
                      px: 0.5,
                      bgcolor: 'success.main',
                      color: 'white'
                    }}
                  >
                    {customerFormattedAmount}
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      </>
    )
  }, [event])
)

export default EventTile
