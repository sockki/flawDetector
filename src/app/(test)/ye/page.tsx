'use client';

import Button from '@/components/Button/Button';
import { auth } from '@/firebase/firebaseClient';
import { signInWithGithub } from '@/utils/signInWithGitHub';
import { useEffect, useState } from 'react';

export default function GithubButton() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLogin(!!user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <Button onClick={signInWithGithub}>로그인 버튼</Button>
      <Button onClick={() => auth.signOut()}>로그아웃 버튼</Button>
      <div>{isLogin ? 'Logged in' : 'Logged out'}</div>
    </>
  );
}
