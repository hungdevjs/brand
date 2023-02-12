import { useState, useEffect } from 'react';
import { query, collection, orderBy, getDocs } from 'firebase/firestore';

import { firestore } from '../configs/firebase.config';

const useArticle = () => {
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    try {
      const q = query(
        collection(firestore, 'articles'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      setArticles(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return {
    articles,
  };
};

export default useArticle;
