import Firebase from "../components/Firebase/Firebase";
import Wrapper from "../components/Wrapper/Wrapper";
import Script from "next/script";
import "../styles/content.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Head from "next/head";
function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.ico" />
      </Head>
      <Firebase>
        <Component {...pageProps} />
      </Firebase>
      <Script
        src="https://kit.fontawesome.com/71ecc900fa.js"
        strategy="lazyOnload"
      />
    </>
  );
}

export default MyApp;
