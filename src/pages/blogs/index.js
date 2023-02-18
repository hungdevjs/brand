import Head from 'next/head';

import BlogList from '@/components/BlogList';

const Blog = () => {
  return (
    <>
      <Head>
        <title>hungdevjs | blogs</title>
        <meta name="description" content="hungdevjs blogs" />
      </Head>
      <BlogList />
    </>
  );
};

export default Blog;
