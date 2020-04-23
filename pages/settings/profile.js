import { withApollo } from '../../api/apollo'
import Layout from '../../components/Layout'

const Profile = () => {
  return (
    <Layout>
      <div>
        <p>Profile</p>
      </div>
    </Layout>
  )
}

export default withApollo()(Profile)
