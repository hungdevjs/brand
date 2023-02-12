import { useState } from 'react';

const useLanguage = () => {
  const [language, setLanguage] = useState('en');

  return { language, setLanguage };
};

export default useLanguage;
