import Head from 'next/head';

interface Props {
  title: string;
  description: string;
  url: string;
  image: string;
}

export function SEO({ title, description, url, image }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content='follow, index' />
      <meta name='description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content='blog' />
      <meta property='og:site_name' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:image' content={image} key={image} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@NateYeum' />
      <meta name='twitter:creator' content='@NateYeum' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      <meta
        name='google-site-verification'
        content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
      />
    </Head>
  );
}
