import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import cookie from 'cookie'
import { concatPagination } from '@apollo/client/utilities'

let apolloClient

function createLink (ctx) {
  const httpLink = new HttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    credentials: 'same-origin'
  })
  const authLink = setContext((_, { headers }) => {
    const token = getNextCookies(ctx).token
    return {
      headers: {
        ...headers,
        authorization: token
          ? `Bearer ${token}`
          : 'Bearer fnADo7wsTXACFACy50YfrNtGNznNMLzV2w2MTwO_'
      }
    }
  })
  return authLink.concat(httpLink)
}

const getNextCookies = ctx => {
  const cookieStr = ctx && ctx.req ? ctx.req.headers.cookie : window.document.cookie
  return cookie.parse(cookieStr || '')
}

function createApolloClient (ctx) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createLink(ctx),
    cache: new InMemoryCache()
  })
}

export function initializeApollo (initialState = null, ctx) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx)

  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo (initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
