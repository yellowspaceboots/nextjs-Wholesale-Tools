import { withApollo } from '../../api/apollo'
import { getLayout } from '../../components/Layout'

const Account = () => {
  return (
    <div>
      <p>Account</p>
    </div>
  )
}

const AccountWithApollo = withApollo()(Account)

AccountWithApollo.getLayout = getLayout

export default AccountWithApollo
