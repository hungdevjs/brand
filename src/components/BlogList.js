import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import { Box, Grid, Typography, Pagination } from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';

import useResponsive from '@/hooks/useResponsive';
import useAppContext from '@/hooks/useAppContext';
import usePaginationArticle from '@/hooks/usePaginationArticle';
import texts from '@/assets/texts.json';
import removeHtml from '@/utils/removeHtml';
import Layout from '@/components/Layout';
import Categories from '@/components/Categories';

const BlogList = () => {
  const {
    query: { categoryId },
  } = useRouter();
  const { isMobile } = useResponsive();
  const {
    categoryState: { categories },
    articleState: { articles },
    languageState: { language },
  } = useAppContext();
  const [search, setSearch] = useState('');
  const { renderedArticles, page, setPage, totalPages } = usePaginationArticle({
    articles,
    categoryId,
    search,
  });

  const renderedArticleWithCategories = useMemo(() => {
    return renderedArticles.map((item) => ({
      ...item,
      category: categories.find(
        (category) => category.id === item.categoryId
      )?.[language === 'en' ? 'enName' : 'viName'],
    }));
  }, [renderedArticles, categories, language]);

  return (
    <>
      <Head>
        <title>hungdev.js - blogs</title>
        <meta name="description" content="hungdev.js blogs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box display="flex" flexDirection="column" gap={4}>
          <Box
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            alignItems={isMobile ? 'flex-start' : 'center'}
            justifyContent="space-between"
            gap={2}
          >
            <Categories />
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              width="400px"
              maxWidth="100%"
            >
              <SearchIcon />
              <input
                placeholder={`${texts[language].search}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                }}
              />
            </Box>
          </Box>
          <Box>
            {!!renderedArticleWithCategories.length ? (
              <Grid container spacing={3}>
                {renderedArticleWithCategories.map((article) => (
                  <Grid key={article.id} item xs={12} sm={6} md={4}>
                    <ArticleItem article={article} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color={grey[600]} align="center">
                {texts[language].no_article}
              </Typography>
            )}
          </Box>
          {!!totalPages && (
            <Box display="flex" justifyContent="center">
              <Pagination
                page={page + 1}
                count={totalPages}
                shape="rounded"
                onChange={(e, newPage) => setPage(newPage - 1)}
              />
            </Box>
          )}
        </Box>
      </Layout>
    </>
  );
};

export default BlogList;

const ArticleItem = ({ article }) => {
  const { push } = useRouter();
  const {
    languageState: { language },
  } = useAppContext();
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <img
        src={article.attachments[0]?.url}
        alt="banner"
        style={{
          width: '100%',
          aspectRatio: '3/2',
          borderRadius: '4px',
          objectFit: 'cover',
          objectPosition: 'center',
          cursor: 'pointer',
        }}
        onClick={() => push(`/blogs/a/${article.id}`)}
      />
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
          {article.category}
        </Typography>
        •
        <Typography fontSize="13px" color={grey[500]}>
          {moment(article.createdAt.toDate()).format('DD/MM/YYYY')}
        </Typography>
      </Box>
      <Typography
        fontSize="22px"
        color={grey[800]}
        fontWeight={300}
        lineHeight="1.5rem"
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all ease 0.3s',
          '&:hover': {
            color: 'black',
          },
        }}
        onClick={() => push(`/blogs/a/${article.id}`)}
      >
        {language === 'en' ? article.enTitle : article.viTitle}
      </Typography>
      <Typography
        fontWeight={300}
        fontSize="13px"
        color={grey[700]}
        lineHeight="1.2rem"
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
        }}
      >
        {removeHtml(language === 'en' ? article.enContent : article.viContent)}
      </Typography>
    </Box>
  );
};
