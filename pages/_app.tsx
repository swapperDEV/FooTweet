import Firebase from '../components/Firebase/Firebase'
import Wrapper from '../components/Wrapper/Wrapper'
import Script from 'next/script'

function MyApp({ Component, pageProps }:any) {
  return (
  <Wrapper>
    <Firebase>
      <Component {...pageProps} />
    </Firebase>
    <Script src="https://kit.fontawesome.com/71ecc900fa.js" strategy="lazyOnload"/>
  </Wrapper>
  )
}

export default MyApp
