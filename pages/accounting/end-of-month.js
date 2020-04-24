import { withApollo } from '../../api/apollo'
import { getLayout } from '../../components/Layout'

const EndOfMonth = () => {
  return (
    <div>
      <p>End of Month</p>
    </div>
  )
}

const EndOfMonthWithApollo = withApollo()(EndOfMonth)

EndOfMonthWithApollo.getLayout = getLayout

export default EndOfMonthWithApollo
