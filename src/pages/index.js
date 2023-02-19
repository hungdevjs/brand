import Head from 'next/head';
import { Box } from '@mui/material';

import useResponsive from '@/hooks/useResponsive';
import Layout from '@/components/Layout';
import Introduction from '@/components/Introduction';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

const image =
  'https://firebasestorage.googleapis.com/v0/b/personal-brand-b19ef.appspot.com/o/metas%2Flogo.png?alt=media&token=0f525b9b-da38-44f0-a952-a7483d0eb8c5';

const Home = () => {
  const { isMobile } = useResponsive();

  return (
    <>
      <Head>
        <title>hungdevjs | portfolio</title>
        <meta name="description" content="Fullstack engineer" />
        {/* Schema.org markup for Google */}
        <meta itemprop="name" content="hungdevjs | portfolio" />
        <meta itemprop="description" content="Fullstack engineer" />
        <meta itemprop="image" content={image} />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="article" />
        <meta name="twitter:site" content="https://hungdevjs.web.app" />
        <meta name="twitter:title" content="hungdevjs | portfolio" />
        <meta name="twitter:description" content="Fullstack engineer" />
        <meta name="twitter:creator" content="hungdevjs" />
        <meta name="twitter:image" content={image} />

        {/* Open Graph data */}
        <meta property="og:title" content="hungdevjs | portfolio" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://hungdevjs.web.app/portfolio" />
        <meta property="og:image" content={image} />
        <meta property="og:description" content="Fullstack engineer" />
        <meta property="og:site_name" content="hungdevjs.web.app" />
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
