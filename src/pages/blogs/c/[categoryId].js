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
          content={`hungdevjs ${category.enName} articles`}
        />
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
