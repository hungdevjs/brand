import { createContext } from 'react';

import useLanguage from '@/hooks/useLanguage';
import useCategory from '@/hooks/useCategory';
import useArticle from '@/hooks/useArticle';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const languageState = useLanguage();
  const categoryState = useCategory();
  const articleState = useArticle();

  return (
    <AppContext.Provider value={{ languageState, categoryState, articleState }}>
      {children}
    </AppContext.Provider>
  );
};
