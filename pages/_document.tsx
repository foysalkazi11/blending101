/* eslint-disable @next/next/no-document-import-in-page */
import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/icons/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/icons/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/icons/favicons/favicon.ico" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-config" content="/icons/favicons/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />

          <meta name="description" content={"Blending101 app description"} />

          {/* Open Graph tags */}
          <meta property="og:url" content={"https://app.blending101.com/"} key="ogurl" />
          <meta property="og:type" content="website" key="ogtype" />
          <meta property="og:site_name" content={"blending101"} key="ogsitename" />
          <meta property="og:title" content={"Blending101 app"} key="ogtitle" />
          <meta property="og:description" content={"Blending101 app description"} key="ogdesc" />
          <meta property="og:image" content={"/logo.png"} key="ogimage" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="app.blending101.com" />
          <meta property="twitter:url" content={"https://app.blending101.com/"} />
          <meta property="twitter:domain" content="garimadisposal.in" />
          <meta name="twitter:title" content={"Blending101 app"} />
          <meta name="twitter:description" content={"Blending101 app description"} />
          <meta name="twitter:image" content={"/logo.png"} />
        </Head>

        <body>
          <Main />
          <NextScript />
          <div id="modal-portal" />
          <div id="tooltip-portal" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
