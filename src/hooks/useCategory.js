import { useState, useEffect } from 'react';
import { query, collection, orderBy } from 'firebase/firestore';

import { firestore } from '../configs/firebase.config';

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const q = query(
      collection(firestore, 'categories'),
      orderBy('order', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategories(docs);
    });

    return unsubscribe;
  }, []);

  return { categories };
};

export default useCategory;
