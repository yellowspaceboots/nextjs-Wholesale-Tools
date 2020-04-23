import { withApollo } from '../../api/apollo'
import Layout from '../../components/Layout'

const MaterialStatusReport = () => {
  return (
    <Layout>
      <div>
        <p>Material Status Report</p>
      </div>
    </Layout>
  )
}

export default withApollo()(MaterialStatusReport)
