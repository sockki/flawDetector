'use client';

import Button from '@/components/Button/Button';
import FilterChip from '@/components/Chips/FilterChip';
import { auth } from '@/firebase/firebaseClient';
import { signInWithGithub } from '@/utils/signInWithGitHub';
import { useEffect, useState } from 'react';

const options = ['option1', 'optixdasdasokd;laon2'];

export default function TestPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [option, setOption] = useState('');

  const handleSelect = (v: string) => {
    setOption(() => v);
  };
  console.log(option);
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
      <FilterChip label="type" options={options} onSelect={handleSelect} hasIcon />
    </>
  );
}
