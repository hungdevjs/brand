import Head from 'next/head';

import BlogList from '@/components/BlogList';
import admin from '@/configs/admin.config';

const BlogCategory = ({ category }) => {
  return (
    <>
      <Head>
        <title>hungdevjs | {category.enName} articles</title>
        <meta
          name="description"
          content={`hungdevjs | ${category.enName} articles`}
        />
        {/* Schema.org markup for Google */}
        <meta
          itemprop="name"
          content={`hungdevjs | ${category.enName} articles`}
        />
        <meta
          itemprop="description"
          content={`hungdevjs | ${category.enName} articles`}
        />
        <meta itemprop="image" content={category.image} />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="article" />
        <meta name="twitter:site" content="https://hungdevjs.web.app" />
        <meta
          name="twitter:title"
          content={`hungdevjs | ${category.enName} articles`}
        />
        <meta
          name="twitter:description"
          content={`hungdevjs | ${category.enName} articles`}
        />
        <meta name="twitter:creator" content="hungdevjs" />
        <meta name="twitter:image" content={category.image} />

        {/* Open Graph data */}
        <meta
          property="og:title"
          content={`hungdevjs | ${category.enName} articles`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://hungdevjs.web.app/blogs/c/${category.id}`}
        />
        <meta property="og:image" content={category.image} />
        <meta
          property="og:description"
          content={`hungdevjs | ${category.enName} articles`}
        />
        <meta property="og:site_name" content="hungdevjs.web.app" />
      </Head>
      <BlogList />
    </>
  );
};

export default BlogCategory;

export const getServerSideProps = async ({ params, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=180'
  );

  const { categoryId } = params;
  const doc = await admin
    .firestore()
    .collection('categories')
    .doc(categoryId)
    .get();
  const category = { id: doc.id, ...doc.data() };

  return {
    props: { category },
  };
};
