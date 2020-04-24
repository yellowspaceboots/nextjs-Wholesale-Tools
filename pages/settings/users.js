import { withApollo } from '../../api/apollo'
import { getLayout } from '../../components/Layout'

const Users = () => {
  return (
    <div>
      <p>Users</p>
    </div>
  )
}

const UsersWithApollo = withApollo()(Users)

UsersWithApollo.getLayout = getLayout

export default UsersWithApollo
