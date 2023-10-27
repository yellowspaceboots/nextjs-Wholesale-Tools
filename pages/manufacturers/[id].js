import { getLayout } from '../../components/Layout'
import CalendarEvent from '../../components/CalendarEvent'
import { useRouter } from 'next/router'
import { initializeApollo, addApolloState } from '../../lib/apollo'
import { FIND_MANUFACTURERS_BY_ID } from '../../lib/queries/findManufacturersById'
import { useQuery } from '@apollo/client'
import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

const Manufacturer = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(FIND_MANUFACTURERS_BY_ID, { variables: { id }})
  if (loading) return <p>Loading</p>
  console.log(data)
  return (
    <>
      <Image
        src={data.findManufacturersByID.image.uri}
        alt="Picture of the author"
        width={350}
        height={105}
      />
    </>
  )
}

Manufacturer.getLayout = getLayout

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo(context)
  console.log({...context.params})
  await apolloClient.query({
    query: FIND_MANUFACTURERS_BY_ID,
    variables: {...context.params},
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Manufacturer
