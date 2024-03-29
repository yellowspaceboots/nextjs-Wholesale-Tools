import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../components/theme'
import { AuthProvider } from '../components/AuthProvider'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'
import { CacheProvider } from '@emotion/react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import createEmotionCache from '../utils/creatEmotionCache'

const clientSideEmotionCache = createEmotionCache()

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const getLayout = Component.getLayout || (page => page)
  const client = useApollo(pageProps)
  return (
    <CacheProvider value={emotionCache}>
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
