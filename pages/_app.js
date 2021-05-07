import { Provider } from 'next-auth/client'
import Header from '../components/header'
import { ThemeProvider } from '@material-ui/core'
import { theme } from '../styles/theme'
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Voucher_Service</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Poppins:wght@300;400;500;600;700&display=swap'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <div className='App' style={{ minHeight: '100vh' }}>
          <Header />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
