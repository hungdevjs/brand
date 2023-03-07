import Head from 'next/head';
import moment from 'moment';

import BlogList from '@/components/BlogList';
import admin from '@/configs/admin.config';

const BlogCategory = ({ articles, categories, category }) => {
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
          itemProp="name"
          content={`hungdevjs | ${category.enName} articles`}
        />
        <meta
          itemProp="description"
          content={`hungdevjs | ${category.enName} articles`}
        />
        <meta itemProp="image" content={category.image} />

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
      <BlogList articles={articles} categories={categories} />
    </>
  );
};

export default BlogCategory;

export const getStaticPaths = async () => {
  const categorySnapshot = await admin
    .firestore()
    .collection('categories')
    .orderBy('order', 'asc')
    .get();

  const categoryIds = categorySnapshot.docs.map((doc) => doc.id);
  const paths = categoryIds.map((categoryId) => ({ params: { categoryId } }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { categoryId } = params;

  const articleSnapshot = await admin
    .firestore()
    .collection('articles')
    .where('categoryId', '==', categoryId)
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

  const category = categories.find((item) => item.id === categoryId);

  return {
    props: { articles, categories, category },
  };
};
