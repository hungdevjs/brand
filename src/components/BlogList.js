import Head from 'next/head';
import { Box } from '@mui/material';

import useResponsive from '@/hooks/useResponsive';
import Layout from '@/components/Layout';
import Categories from '@/components/Categories';
import LanguageSelector from '@/components/LanguageSelector';

const BlogList = () => {
  const { isMobile } = useResponsive();

  return (
    <>
      <Head>
        <title>hungdev.js - blogs</title>
        <meta name="description" content="hungdev.js blogs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box display="flex" flexDirection="column" gap={isMobile ? 5 : 10}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Categories />
            <LanguageSelector />
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default BlogList;
