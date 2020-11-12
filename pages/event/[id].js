import { getLayout } from '../../components/Layout'
import CalendarEvent from '../../components/CalendarEvent'
import { useRouter } from 'next/router'

const Event = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <CalendarEvent id={id} />
  )
}

Event.getLayout = getLayout

export default Event
