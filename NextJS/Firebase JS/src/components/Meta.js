import Head from "next/head";

const Meta = ({
  title,
  keywords,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
}) => {
  const website = "Firebase App NextJS";
  const websiteUrl = "-";
  const twitterCreator = "@-";

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      {/* Facebook:
      Title: 40 characters for mobile and 60 for desktop
      Description: 2–4 sentences
      Image: 1.91:1 ratio / 1200x630 optimal across all devices.
      */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      {/* Twitter:
      Title: 70 characters
      Description: 200 characters
      Image: at least 280 x 150 pixels and no more than 1MB 
      */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={websiteUrl} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />

      <link rel="icon" href="/favicon.ico" />
      <title>
        {title} - {website}
      </title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "",
  keywords: "",
  description: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogUrl: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
};

export default Meta;
