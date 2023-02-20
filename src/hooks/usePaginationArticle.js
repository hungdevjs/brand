import { useMemo, useState } from 'react';

const isMatch = (mainString, searchString) =>
  mainString.toLowerCase().includes(searchString.trim().toLowerCase());

const usePaginationArticle = ({ articles, search }) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(12);

  const matchedArticles = useMemo(() => {
    let filteredArticles = articles;

    if (search) {
      filteredArticles = filteredArticles.filter(
        (item) => isMatch(item.enTitle, search) || isMatch(item.viTitle, search)
      );
    }

    return filteredArticles;
  }, [articles, search]);

  const renderedArticles = useMemo(() => {
    const start = page * limit;
    const end = (page + 1) * limit;
    return matchedArticles.slice(start, end);
  }, [matchedArticles, page, limit]);

  return {
    renderedArticles,
    page,
    limit,
    totalPages: Math.ceil(matchedArticles.length / limit),
    setPage,
    setLimit,
  };
};

export default usePaginationArticle;
