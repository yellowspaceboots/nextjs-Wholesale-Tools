import { withApollo } from '../../api/apollo'
import Layout from '../../components/Layout'

const EndOfMonth = () => {
  return (
    <Layout>
      <div>
        <p>End of Month</p>
      </div>
    </Layout>
  )
}

export default withApollo()(EndOfMonth)
