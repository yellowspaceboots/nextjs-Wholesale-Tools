import { getLayout } from '../../components/Layout'
import CommercialCalendar from '../../components/CommercialCalendar'
import { useRouter } from 'next/router'

const Calendar = () => {
    const router = useRouter()
    const { params } = router.query
  return (
      <CommercialCalendar view={params[0]} year={params[1]} month={params[2]} day={params[3]} />
  )
}

Calendar.getLayout = getLayout

export default Calendar
