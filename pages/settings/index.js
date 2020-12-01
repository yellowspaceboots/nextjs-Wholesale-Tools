import { getLayout } from '../../components/Layout'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CommercialProjectsSettings from '../../components/CommercialProjectsSettings'
import UserSettings from '../../components/UserSettings'
import { useAuth } from '../../components/AuthProvider'

const Settings = () => {
  const { user } = useAuth()
  const settingsAccess = {
    commercialProjects: user.role === 'MANAGER',
    users: user.role === 'MANAGER' && user.name === 'Jon Busch'
  }
  return (
    <Grid container direction='column'>
      <Grid item><Typography variant='subtitle1' style={{ margin: 10, marginLeft: 0 }}>Settings</Typography></Grid>
      <Grid container item direction='column' spacing={4}>
        {settingsAccess.commercialProjects && <Grid item><CommercialProjectsSettings /></Grid>}
        {settingsAccess.users && <Grid item><UserSettings /></Grid>}
      </Grid>
    </Grid>

  )
}

Settings.getLayout = getLayout

export default Settings
