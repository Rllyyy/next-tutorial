import { Navbar } from "components/navbar";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
