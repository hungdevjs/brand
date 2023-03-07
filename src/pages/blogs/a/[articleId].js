import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import parse from 'html-react-parser';
import { stripHtml } from 'string-strip-html';

import useAppContext from '@/hooks/useAppContext';
import admin from '@/configs/admin.config';
import texts from '@/assets/texts.json';
import Layout from '@/components/Layout';

const getMetaDescription = (html) => {
  const rawContent = stripHtml(html).result;
  const words = rawContent.split(' ');
  let description = '';
  let i = 0;
  while (description.length < 100 && i < words.length) {
    description += words[i];
    i++;
  }
  return description;
};

const Article = ({ article }) => {
  const { push } = useRouter();
  const {
    languageState: { language },
  } = useAppContext();

  return (
    <>
      <Head>
        <title>hungdevjs | {article.enTitle}</title>
        <meta
          name="description"
          content={getMetaDescription(article.enContent)}
        />

        {/* Schema.org markup for Google */}
        <meta itemProp="name" content={article.enTitle} />
        <meta
          itemProp="description"
          content={getMetaDescription(article.enContent)}
        />
        <meta itemProp="image" content={article.attachments[0].url} />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="article" />
        <meta name="twitter:site" content="https://hungdevjs.web.app" />
        <meta name="twitter:title" content={article.enTitle} />
        <meta
          name="twitter:description"
          content={getMetaDescription(article.enContent)}
        />
        <meta name="twitter:creator" content="hungdevjs" />
        <meta name="twitter:image" content={article.attachments[0].url} />

        {/* Open Graph data */}
        <meta property="og:title" content={article.enTitle} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://hungdevjs.web.app/blogs/a/${article.id}`}
        />
        <meta property="og:image" content={article.attachments[0].url} />
        <meta
          property="og:description"
          content={getMetaDescription(article.enContent)}
        />
        <meta property="og:site_name" content="hungdevjs.web.app" />
      </Head>
      <Layout>
        <Container>
          <Box display="flex" flexDirection="column" gap={1}>
            <Box
              mb={2}
              alignSelf="flex-start"
              display="flex"
              alignItems="center"
              gap={2}
              sx={{ cursor: 'pointer' }}
              onClick={() => push(`/blogs/c/${article.category?.id}`)}
            >
              <ArrowBackIcon />
              <Typography>{texts[language].back_to_article_list}</Typography>
            </Box>
            <Box>
              <Typography
                fontSize="24px"
                color={grey[800]}
                fontWeight={300}
                lineHeight="1.5rem"
              >
                {article[language === 'en' ? 'enTitle' : 'viTitle']}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography
                fontWeight={500}
                fontSize="13px"
                color={grey[700]}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
                onClick={() => push(`/blogs/c/${article.categoryId}`)}
              >
                {article.category?.[language === 'en' ? 'enName' : 'viName']}
              </Typography>
              •
              <Typography fontSize="13px" color={grey[500]}>
                {article.createdAt}
              </Typography>
            </Box>
            <img
              src={article.attachments[0]?.url}
              alt="banner"
              style={{
                width: '100%',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => push(`/blogs/a/${article.id}`)}
            />
            <Box
              sx={{
                '& img': {
                  width: '100%',
                  height: 'auto',
                  borderRadius: 1,
                },
                '& p': {
                  lineHeight: '1.5rem',
                },
              }}
            >
              {parse(article[language === 'en' ? 'enContent' : 'viContent'])}
            </Box>
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default Article;

export const getServerSideProps = async ({ params, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=180'
  );

  const { articleId } = params;
  const doc = await admin
    .firestore()
    .collection('articles')
    .doc(articleId)
    .get();

  const article = {
    id: doc.id,
    ...doc.data(),
    createdAt: moment(doc.data().createdAt.toDate()).format('DD/MM/YYYY'),
  };

  const categoryDoc = await admin
    .firestore()
    .collection('categories')
    .doc(article.categoryId)
    .get();

  article.category = {
    id: categoryDoc.id,
    ...categoryDoc.data(),
  };

  return {
    props: { article },
  };
};
