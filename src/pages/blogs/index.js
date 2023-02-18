import Head from 'next/head';

import BlogList from '@/components/BlogList';

const Blog = () => {
  return (
    <>
      <Head>
        <title>hungdevjs | latest articles</title>
        <meta name="description" content="hungdevjs latest articles" />
      </Head>
      <BlogList />
    </>
  );
};

export default Blog;
