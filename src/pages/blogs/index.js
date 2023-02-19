import Head from 'next/head';

import BlogList from '@/components/BlogList';

const image =
  'https://firebasestorage.googleapis.com/v0/b/personal-brand-b19ef.appspot.com/o/metas%2Flogo.png?alt=media&token=0f525b9b-da38-44f0-a952-a7483d0eb8c5';

const Blog = () => {
  return (
    <>
      <Head>
        <title>hungdevjs | blogs</title>
        <meta name="description" content="hungdevjs | blogs" />
        {/* Schema.org markup for Google */}
        <meta itemprop="name" content="hungdevjs | blogs" />
        <meta itemprop="description" content="hungdevjs | blogs" />
        <meta itemprop="image" content={image} />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="article" />
        <meta name="twitter:site" content="https://hungdevjs.web.app" />
        <meta name="twitter:title" content="hungdevjs | blogs" />
        <meta name="twitter:description" content="hungdevjs | blogs" />
        <meta name="twitter:creator" content="hungdevjs" />
        <meta name="twitter:image" content={image} />

        {/* Open Graph data */}
        <meta property="og:title" content="hungdevjs | blogs" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://hungdevjs.web.app/blogs" />
        <meta property="og:image" content={image} />
        <meta property="og:description" content="hungdevjs | blogs" />
        <meta property="og:site_name" content="hungdevjs.web.app" />
      </Head>
      <BlogList />
    </>
  );
};

export default Blog;
