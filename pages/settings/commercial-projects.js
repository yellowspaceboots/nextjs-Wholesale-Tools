import { getLayout } from '../../components/Layout'
import CommercialProjectsSettings from '../../components/CommercialProjectsSettings'

const CommercialProjectsSettingsPage = () => {
  return (
    <div>
      <p>Settings</p>
      <CommercialProjectsSettings />
    </div>
  )
}

CommercialProjectsSettingsPage.getLayout = getLayout

export default CommercialProjectsSettingsPage
