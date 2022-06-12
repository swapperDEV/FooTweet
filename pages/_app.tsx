import Firebase from '../components/Firebase/Firebase'
import Wrapper from '../components/Wrapper/Wrapper'
import Script from 'next/script'
import '../styles/content.css'

function MyApp({ Component, pageProps }:any) {
  return (
  <>
    <Firebase>
      <Component {...pageProps} />
    </Firebase>
    <Script src="https://kit.fontawesome.com/71ecc900fa.js" strategy="lazyOnload"/>
  </>
  )
}

export default MyApp
