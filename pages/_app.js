import React, { useEffect } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../components/theme'
import { withApollo } from '../api/apollo'
import { AuthProvider } from '../components/AuthProvider'

const MyApp = (props) => {
  const { Component, pageProps } = props
  const getLayout = Component.getLayout || (page => page)

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Wholesale Electric Tools</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthProvider>
          {getLayout(<Component {...pageProps} />)}
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default withApollo()(MyApp)
