import { withApollo } from '../../api/apollo'
import Layout from '../../components/Layout'

const Account = () => {
  return (
    <Layout>
      <div>
        <p>Account</p>
      </div>
    </Layout>
  )
}

export default withApollo()(Account)
