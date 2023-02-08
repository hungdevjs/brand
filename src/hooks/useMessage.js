import { collection, addDoc } from 'firebase/firestore';

import { firestore } from '@/configs/firebase.config';

const useMessage = () => {
  const sendMessage = async ({ email, message }) => {
    const collectionRef = collection(firestore, 'messages');
    await addDoc(collectionRef, { email, message });
  };

  return { sendMessage };
};

export default useMessage;
