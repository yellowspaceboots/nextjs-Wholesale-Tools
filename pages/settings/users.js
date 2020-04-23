import { withApollo } from '../../api/apollo'
import Layout from '../../components/Layout'

const Users = () => {
  return (
    <Layout>
      <div>
        <p>Users</p>
      </div>
    </Layout>
  )
}

export default withApollo()(Users)
