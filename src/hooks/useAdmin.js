import { useState, useEffect } from 'react';
import { addDoc, collection, setDoc } from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import { auth, firestore, storage } from '@/configs/firebase.config';

const useAdmin = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsInitialized(true);
    });

    return unsubscribe;
  });

  const login = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return { isInitialized, user, login };
};

export default useAdmin;
