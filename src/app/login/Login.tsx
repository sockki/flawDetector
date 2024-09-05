'use client';

import { Ellipse } from '@/components/Ellipse';
import Button from '@/components/Button/Button';

export default function UiLogin() {
  const handleButtonClick = () => {
    console.log('Button clicked');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <Ellipse />

      <div className="flex h-[20.3rem] w-[140.6rem] items-center justify-between">
        <div className="flex h-[20.3rem] w-[43.8rem] flex-col items-center gap-[2rem]">
          <h1 className="text-[6rem] text-primary-500">Find your Flaw,</h1>
          <Button onClick={handleButtonClick}>Login</Button>
        </div>

        <Button
          onClick={handleButtonClick}
          className="rounded-full bg-primary-500 text-[2.8rem] text-white"
        >
          Github로 연동 로그인하기
        </Button>

        <Button
          onClick={handleButtonClick}
          className="rounded-full bg-primary-500 text-[2.4rem] text-white"
        >
          Github
        </Button>
      </div>
    </div>
  );
}
