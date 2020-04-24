import { withApollo } from '../../api/apollo'
import { getLayout } from '../../components/Layout'

const Calendar = () => {
  return (
    <div>
      <p>Calendar</p>
    </div>
  )
}

const CalendarWithApollo = withApollo()(Calendar)

CalendarWithApollo.getLayout = getLayout

export default CalendarWithApollo
