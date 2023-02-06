import Head from 'next/head';
import { Box } from '@mui/material';

import useResponsive from '@/hooks/useResponsive';
import Layout from '@/components/Layout';
import Introduction from '@/components/Introduction';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

const Home = () => {
  const { isMobile } = useResponsive();

  return (
    <>
      <Head>
        <title>hungdev.js</title>
        <meta name="description" content="hungdev.js portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box display="flex" flexDirection="column" gap={isMobile ? 5 : 10}>
          <Introduction />
          <Projects />
          <Contact />
        </Box>
      </Layout>
    </>
  );
};

export default Home;
