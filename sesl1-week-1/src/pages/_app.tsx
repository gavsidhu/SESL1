import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
    <title>Click Counter - Gavin Sidhu</title>
      <meta content="Click counter for SESL1 week one" name='description' />
    </Head>
    <Component {...pageProps} />
    </>
  )
}
