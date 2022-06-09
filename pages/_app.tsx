import Firebase from '../components/Firebase/Firebase'
import Wrapper from '../components/Wrapper/Wrapper'

function MyApp({ Component, pageProps }:any) {
  return (
  <Wrapper>
    <Firebase>
      <Component {...pageProps} />
    </Firebase>
  </Wrapper>
  )
}

export default MyApp
