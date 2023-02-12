import { useState, useEffect } from 'react';
import { query, collection, orderBy, getDocs } from 'firebase/firestore';

import { firestore } from '../configs/firebase.config';

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const q = query(
        collection(firestore, 'categories'),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);
      setCategories([
        { id: '1', enName: 'Latest', viName: 'Mới nhất' },
        ...snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categories };
};

export default useCategory;
