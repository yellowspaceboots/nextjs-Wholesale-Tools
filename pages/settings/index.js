import { getLayout } from '../../components/Layout'
import Grid from '@material-ui/core/Grid'
import CommercialProjectsSettings from '../../components/CommercialProjectsSettings'
import UserSettings from '../../components/UserSettings'
import { useAuth } from '../../components/AuthProvider'

const Settings = () => {
  const { user } = useAuth()
  return (
    <Grid containter direction='column'>
      <Grid item><p>Settings</p></Grid>
      <Grid container item direction='column' spacing={4}>
        {user.role === 'MANAGER' && <Grid item><CommercialProjectsSettings /></Grid>}
        {user.role === 'MANAGER' && <Grid item><UserSettings /></Grid>}
      </Grid>
    </Grid>

  )
}

Settings.getLayout = getLayout

export default Settings
