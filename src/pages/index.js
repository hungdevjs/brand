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
        <title>hungdevjs</title>
        <meta name="description" content="hungdevjs portfolio" />
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
