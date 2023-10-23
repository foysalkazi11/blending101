/* eslint-disable @next/next/no-document-import-in-page */
import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";
import Meta from "theme/meta";
import { DefaultSeo } from "next-seo";

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
        </Head>
        <DefaultSeo
          title="Blending101 app"
          description="Blending101 app description "
          canonical="https://app.blending101.com/"
          openGraph={{
            url: "https://app.blending101.com/",
            title: "Blending101 app",
            description: "Blending101 app description",
            images: [
              {
                url: "/logo.png",
                width: 800,
                height: 600,
                alt: "Og Image Alt",
                type: "image/jpeg",
              },
              {
                url: "/logo.png",
                width: 900,
                height: 800,
                alt: "Og Image Alt Second",
                type: "image/jpeg",
              },
              { url: "/logo.png" },
              { url: "/logo.png" },
            ],
            siteName: "Blending101",
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
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
