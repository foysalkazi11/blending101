import Head from "next/head";

interface MetaProps {
  title?: string;
  description?: string;
  ogImage?: string;
  twitterHandle?: string;
  url?: string;
}

const Meta: React.FC<MetaProps> = ({
  title = "Blending101",
  description = "Blending101 description",
  ogImage = "/logo.png",
  url = "https://app.blending101.com/",
  twitterHandle,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />

    {/* Open Graph tags */}
    <meta property="og:url" content={url} key="ogurl" />
    <meta property="og:type" content="website" key="ogtype" />
    <meta property="og:site_name" content={"blending101"} key="ogsitename" />
    <meta property="og:title" content={title} key="ogtitle" />
    <meta property="og:description" content={description} key="ogdesc" />
    <meta property="og:image" content={ogImage} key="ogimage" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    {/* Twitter Card tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="app.blending101.com" />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:domain" content="garimadisposal.in" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />

    {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
  </Head>
);

export default Meta;
