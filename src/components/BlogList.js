import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import { Box, Grid, Typography, Pagination } from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';

import useResponsive from '@/hooks/useResponsive';
import useAppContext from '@/hooks/useAppContext';
import usePaginationArticle from '@/hooks/usePaginationArticle';
import texts from '@/assets/texts.json';
import Layout from '@/components/Layout';
import Categories from '@/components/Categories';
import ArticleItem from './ArticleItem';

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
  );
};

export default BlogList;
