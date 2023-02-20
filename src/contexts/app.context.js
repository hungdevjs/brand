import { createContext } from 'react';

import useLanguage from '@/hooks/useLanguage';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const languageState = useLanguage();

  return (
    <AppContext.Provider value={{ languageState }}>
      {children}
    </AppContext.Provider>
  );
};
