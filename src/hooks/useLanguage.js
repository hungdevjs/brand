import { useState } from 'react';

const useLanguage = () => {
  const [language, setLanguage] = useState('vi');

  return { language, setLanguage };
};

export default useLanguage;
