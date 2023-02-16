import { useState } from 'react';
import { Box } from '@mui/material';

import useAdmin from '@/hooks/useAdmin';
import Login from '@/components/admin/Login';
import ArticleList from '@/components/admin/ArticleList';
import ArticleDetail from '@/components/admin/ArticleDetail';

const Admin = () => {
  const { isInitialized, user } = useAdmin();
  const [option, setOption] = useState('article-list');
  const [activeArticleId, setActiveArticleId] = useState(null);

  if (!isInitialized) return null;

  if (!user) return <Login />;

  if (option === 'article-detail')
    return (
      <ArticleDetail
        activeArticleId={activeArticleId}
        back={() => {
          setActiveArticleId(null);
          setOption('article-list');
        }}
      />
    );

  if (option === 'article-list')
    return (
      <ArticleList
        setOption={setOption}
        setActiveArticleId={setActiveArticleId}
      />
    );

  return (
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      Admin
    </Box>
  );
};

export default Admin;
