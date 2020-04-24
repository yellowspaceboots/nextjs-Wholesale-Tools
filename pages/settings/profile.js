import { withApollo } from '../../api/apollo'
import { getLayout } from '../../components/Layout'

const Profile = () => {
  return (
    <div>
      <p>Profile</p>
    </div>
  )
}

const ProfileWithApollo = withApollo()(Profile)

ProfileWithApollo.getLayout = getLayout

export default ProfileWithApollo
