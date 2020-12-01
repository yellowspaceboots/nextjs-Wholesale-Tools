import { getLayout } from '../../../../components/Layout'
import { useRouter } from 'next/router'
import Customer from '../../../../components/Customer'

const CustomerPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <Customer id={id} />
  )
}

CustomerPage.getLayout = getLayout

export default CustomerPage
