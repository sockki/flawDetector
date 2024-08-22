import { auth, db } from '@/firebase/firebaseClient';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export const signInWithGithub = async () => {
  const provider = new GithubAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photo: user.photoURL,
  });
};
