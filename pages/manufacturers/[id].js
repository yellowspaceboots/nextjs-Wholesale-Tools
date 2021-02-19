import { getLayout } from '../../components/Layout'
import CalendarEvent from '../../components/CalendarEvent'
import { useRouter } from 'next/router'
import { initializeApollo, addApolloState } from '../../testApi/testApollo'
import { FIND_MANUFACTURERS_BY_ID } from '../../testApi/queries/findManufacturersById'

const Manufacturer = (props) => {
  const router = useRouter()
  const { id } = router.query
  console.log(props)
  return (
      <p>{id}</p>
  )
}

Manufacturer.getLayout = getLayout

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: FIND_MANUFACTURERS_BY_ID,
    variables: {...context.params},
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default Manufacturer
