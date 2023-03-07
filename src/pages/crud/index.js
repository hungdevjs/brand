import { useState } from 'react';
import { Box } from '@mui/material';

import useAdmin from '@/hooks/useAdmin';
import Login from '@/components/admin/Login';
import ArticleList from '@/components/admin/ArticleList';
import ArticleDetail from '@/components/admin/ArticleDetail';

const Admin = () => {
  const {
    isInitialized,
    user,
    articles,
    categories,
    createArticle,
    updateArticle,
    uploadFile,
  } = useAdmin();
  const [option, setOption] = useState('article-list');
  const [activeArticleId, setActiveArticleId] = useState(null);

  if (!isInitialized) return null;

  if (!user) return <Login />;

  if (option === 'article-detail')
    return (
      <ArticleDetail
        articles={articles}
        categories={categories}
        createArticle={createArticle}
        updateArticle={updateArticle}
        uploadFile={uploadFile}
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
        articles={articles}
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

// export const getStaticProps = async () => {
//   const environment = process.env.NODE_ENV;
//   console.log({ environment });

//   if (environment === 'production') {
//     return { redirect: { destination: '/', permanent: true } };
//   }

//   return { props: {} };
// };
