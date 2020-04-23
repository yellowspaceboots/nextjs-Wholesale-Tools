import { withApollo } from '../../api/apollo'
import Layout from '../../components/Layout'

const Calendar = () => {
  return (
    <Layout>
      <div>
        <p>Calendar</p>
      </div>
    </Layout>
  )
}

export default withApollo()(Calendar)
