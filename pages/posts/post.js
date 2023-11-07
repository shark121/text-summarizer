import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import Layout from "../../components/layout";

export default function Firstpost() {
  return (
    <>
      <Layout>
        <Head>
          <title>this is in the title head</title>
          <Script
            src="https://connect.facebook.net/en_US/sdk.js"
            strategy="lazyOnLoad"
            onLoad={() => console.log("loaded sucessfully")}
          />
        </Head>

        <Link href="/">back to home</Link>
        <h1>this is the about page</h1>
      </Layout>
    </>
  );
}
