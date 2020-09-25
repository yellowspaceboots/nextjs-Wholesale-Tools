import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import cookie from 'cookie'

export default function createApolloClient (initialState, ctx) {
  const httpLink = new HttpLink({
    uri: 'https://graphql.fauna.com/graphql', // Server URL (must be absolute)
    credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getNextCookies(ctx).token
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token
          ? `Bearer ${token}`
          : 'Bearer fnADo7wsTXACFACy50YfrNtGNznNMLzV2w2MTwO_'
      }
    }
  })
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState)
  })
}
/*
export default function createApolloClient (initialState, ctx) {
  const httpLink = new HttpLink({
    uri: 'https://graphql.fauna.com/graphql', // Server URL (must be absolute)
    credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getNextCookies(ctx).token
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token
          ? `Bearer ${token}`
          : 'Bearer fnADo7wsTXACFACy50YfrNtGNznNMLzV2w2MTwO_'
      }
    }
  })

  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState)
  })
}
*/
const getNextCookies = ctx => {
  const cookieStr = ctx && ctx.req ? ctx.req.headers.cookie : window.document.cookie
  return cookie.parse(cookieStr || '')
}
