'use client';

import Button from '@/components/Button/Button';
import { signInWithGithub } from '@/utils/signInWithGitHub';

export default function Login() {
  const handleClickLogin = async () => {
    try {
      const user = await signInWithGithub();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleClickLogin}>Login</Button>;
}
