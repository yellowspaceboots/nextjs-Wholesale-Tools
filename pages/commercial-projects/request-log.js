import React from 'react'
import { withApollo } from '../../api/apollo'
import { getLayout } from '../../components/Layout'

const RequestLog = () => {
  return (
    <div>
      <p>Request Log</p>
    </div>
  )
}

const RequestLogWithApollo = withApollo()(RequestLog)

RequestLogWithApollo.getLayout = getLayout

export default RequestLogWithApollo
