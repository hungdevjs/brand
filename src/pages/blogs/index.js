import Head from 'next/head';
import moment from 'moment';

import BlogList from '@/components/BlogList';
import admin from '@/configs/admin.config';

const image =
  'https://firebasestorage.googleapis.com/v0/b/personal-brand-b19ef.appspot.com/o/metas%2Flogo.png?alt=media&token=0f525b9b-da38-44f0-a952-a7483d0eb8c5';

const Blog = ({ articles, categories }) => {
  return (
    <>
      <Head>
        <title>hungdevjs | blogs</title>
        <meta name="description" content="hungdevjs | blogs" />
        {/* Schema.org markup for Google */}
        <meta itemProp="name" content="hungdevjs | blogs" />
        <meta itemProp="description" content="hungdevjs | blogs" />
        <meta itemProp="image" content={image} />

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
      <BlogList articles={articles} categories={categories} />
    </>
  );
};

export default Blog;

export const getServerSideProps = async ({ params, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=180'
  );

  const articleSnapshot = await admin
    .firestore()
    .collection('articles')
    .orderBy('createdAt', 'desc')
    .get();

  const articles = articleSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: moment(doc.data().createdAt.toDate()).format('DD/MM/YYYY'),
  }));

  const categorySnapshot = await admin
    .firestore()
    .collection('categories')
    .orderBy('order', 'asc')
    .get();

  const categories = categorySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: { articles, categories },
  };
};
