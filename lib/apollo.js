import { useMemo } from 'react'
import { from, ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import cookie from 'cookie'
import { onError } from '@apollo/client/link/error'
import Router from 'next/router'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient

function createLink (ctx) {
  const httpLink = new HttpLink({
      uri: '/api/graphql',
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
  const authLink = setContext(async (_, { headers }) => {
    const token = getNextCookies(ctx)
    const secret = token || 'fnADo7wsTXACFACy50YfrNtGNznNMLzV2w2MTwO_'
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${secret}`
      }
    }
  })
  const additiveLink = from([errorLink, authLink, httpLink])
  return additiveLink
}

const getNextCookies = (ctx) => {
  const cookieStr = typeof window === 'undefined' ? ctx.req.headers.cookie : window.document.cookie
  const myNextCookie = cookie.parse(cookieStr || '').token
  return myNextCookie
}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getQuotationsV10: {
          keyArgs: ['input'],
          merge (existing, incoming, { readField }) {
            const data = (incoming.after && existing) ? { ...existing.data } : {}
            incoming.data.forEach(quote => {
              data[readField('id', quote)] = quote
            })
            return {
              before: incoming.before,
              after: incoming.after,
              data
            }
          },

          read (existing) {
            if (existing) {
              return {
                before: existing.before,
                after: existing.after,
                data: Object.values(existing.data)
              }
            }
          }
        }
      }
    }
  }
})

function createApolloClient (ctx) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createLink(ctx),
    cache: cache
  })
}

export function initializeApollo2 (ctx, initialState = null) {
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

export function initializeApollo (ctx, initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx)

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

export const useApollo2 = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}

export function useApollo (pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  return useMemo(() => initializeApollo(state), [state])
}
