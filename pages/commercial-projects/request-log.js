import React from 'react'
import { withApollo } from '../../api/apollo'
import Layout from '../../components/Layout'

const RequestLog = () => {
  return (
    <Layout>
      <div>
        <p>Request Log</p>
      </div>
    </Layout>
  )
}

export default withApollo()(RequestLog)
