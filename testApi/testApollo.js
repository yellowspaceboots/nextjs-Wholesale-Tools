import { useMemo } from 'react'
import { from, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import cookie from 'cookie'
import { concatPagination } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import Router from 'next/router'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient

function createLink (ctx) {
  const httpLink = new HttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    credentials: 'same-origin'
  })
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        for (const err of graphQLErrors) {
          console.log(err)
          switch (err.extensions.code) {
            case 'permission denied':
              Router.reload(window.location.pathname)
          }
        }
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      })
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })
  const authLink = setContext((_, { headers }) => {
    const token = getNextCookies(ctx)
    return {
      headers: {
        ...headers,
        authorization: token
          ? `Bearer ${token}`
          : 'Bearer fnADo7wsTXACFACy50YfrNtGNznNMLzV2w2MTwO_'
      }
    }
  })
  const additiveLink = from([errorLink, authLink, httpLink])
  return additiveLink
}

const getNextCookies = (ctx) => {
  const cookieStr = (ctx && ctx.req) ? ctx.req.headers.cookie : window.document.cookie
  const myNextCookie = cookie.parse(cookieStr || '').token
  return myNextCookie
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

export function initializeApollo2 (initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        )
      ]
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const addApolloState = (client, pageProps) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}

export function useApollo2 (pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
