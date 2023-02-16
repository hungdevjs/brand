import { useState, useEffect } from 'react';
import { query, collection, orderBy } from 'firebase/firestore';

import { firestore } from '../configs/firebase.config';

const useArticle = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const q = query(
      collection(firestore, 'articles'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setArticles(docs);
    });

    return unsubscribe;
  }, []);

  return {
    articles,
  };
};

export default useArticle;
