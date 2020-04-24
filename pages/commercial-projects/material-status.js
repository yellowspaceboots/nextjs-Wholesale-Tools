import { withApollo } from '../../api/apollo'
import { getLayout } from '../../components/Layout'

const MaterialStatusReport = () => {
  return (
    <div>
      <p>Material Status Report</p>
    </div>
  )
}

const MaterialStatusReportWithApollo = withApollo()(MaterialStatusReport)

MaterialStatusReportWithApollo.getLayout = getLayout

export default MaterialStatusReportWithApollo
