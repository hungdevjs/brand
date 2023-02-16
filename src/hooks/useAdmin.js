import { useState, useEffect } from 'react';
import {
  doc,
  addDoc,
  collection,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { v4 } from 'uuid';

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

  const createArticle = async (article) => {
    const collectionRef = collection(firestore, 'articles');
    await addDoc(collectionRef, { ...article, createdAt: serverTimestamp() });
  };

  const updateArticle = async (id, article) => {
    const docRef = doc(firestore, 'articles', id);
    await setDoc(docRef, article, { merge: true });
  };

  const uploadFile = async (file) => {
    const storageRef = `articles/${v4()}`;
    const fileRef = ref(storage, storageRef);
    const metadata = { contentType: file.type };
    await uploadBytes(fileRef, file, metadata);
    const url = await getDownloadURL(fileRef);
    return { storageRef, url };
  };

  return {
    isInitialized,
    user,
    login,
    createArticle,
    updateArticle,
    uploadFile,
  };
};

export default useAdmin;
