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
          {/* <link href="https://fonts.cdnfonts.com/css/segoe-ui-4" rel="stylesheet" /> */}

          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-config" content="/icons/favicons/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />

          <meta name="title" content="Blending101 app" />
          <meta name="description" content="Blending101 app description" />

          {/* Open Graph tags */}

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="app.blending101.com" />
          <meta property="twitter:url" content={"https://app.blending101.com/"} />
          <meta property="twitter:domain" content="garimadisposal.in" />
          <meta name="twitter:title" content={"Blending101 app"} />
          <meta name="twitter:description" content={"Blending101 app description"} />
          <meta name="twitter:image" content={"/logo_small.svg"} />
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
