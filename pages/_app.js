import React, { useEffect } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../components/theme'
import { AuthProvider } from '../components/AuthProvider'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/testApollo'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'

export const cache = createCache({ key: 'css' })

const MyApp = (props) => {
  const { Component, pageProps } = props
  const getLayout = Component.getLayout || (page => page)
  const client = useApollo(pageProps)
  // const apolloClient = useApollo(pageProps)

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
    <CacheProvider value={cache}>
      <ApolloProvider client={client}>
        <Head>
          <title>Wholesale Electric Tools</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {getLayout(<Component {...pageProps} />)}
            </LocalizationProvider>
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  )
}

export default MyApp
