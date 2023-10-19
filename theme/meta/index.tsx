import Head from "next/head";

interface MetaProps {
  title?: string;
  description?: string;
  ogImage?: string;
  twitterHandle?: string;
}

const Meta: React.FC<MetaProps> = ({
  title = "Blending101",
  description = "Blending101 description",
  ogImage = "/logo.png",
  twitterHandle,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />

    {/* Open Graph tags */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />

    {/* Twitter Card tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />

    {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
  </Head>
);

export default Meta;
