import Head from "next/head";
import { TITLE } from "../constants";
import { UserProvider } from "../context/UserContext";
import "../styles/global.css";
import "../styles/modal.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <link rel="icon" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins"
        />
      </Head>

      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
