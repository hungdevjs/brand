import { useMemo, useState } from 'react';

import useAppContext from './useAppContext';

const isMatch = (mainString, searchString) =>
  mainString.toLowerCase().includes(searchString.trim().toLowerCase());

const usePaginationArticle = ({ articles, categoryId, search }) => {
  const {
    languageState: { language },
  } = useAppContext();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);

  const renderedArticles = useMemo(() => {
    let filteredArticles = articles;
    if (categoryId && categoryId !== '1') {
      filteredArticles = filteredArticles.filter(
        (item) => item.categoryId === categoryId
      );
    }

    if (search) {
      filteredArticles = filteredArticles.filter(
        (item) => isMatch(item.enTitle, search) || isMatch(item.viTitle, search)
      );
    }

    const start = page * limit;
    const end = (page + 1) * limit;
    return filteredArticles.slice(start, end);
  }, [articles, categoryId, search, page, limit, language]);

  return { renderedArticles, page, limit, setPage, setLimit };
};

export default usePaginationArticle;
