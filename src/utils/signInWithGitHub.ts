import { auth, db } from '@/firebase/firebaseClient';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const signInWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });
    }
  } catch (error) {
    throw error;
  }
};
