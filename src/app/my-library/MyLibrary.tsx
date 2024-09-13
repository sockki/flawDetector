'use client';

import { useRouter } from 'next/navigation';
import { Ellipse } from '@/components/Ellipse';
import Button from '@/components/Button/Button';
import React from 'react';

export default function MyComponent() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/login');
  };

  return (
    <div className="relative h-[102.4rem] w-full overflow-hidden">
      <Ellipse />

      <div className="min-h-full content-center">
        <div className="flex flex-col items-center gap-[6.5rem]">
          <div className="flex flex-col items-center justify-center gap-[4rem]">
            <div className="flex flex-col items-center justify-center gap-[2rem]">
              <h1 className="text-[6rem] font-normal leading-[7.261rem] tracking-[0.015em] text-primary-500">
                containing code files
              </h1>
              <div className="flex h-[11rem] w-[47rem] items-center justify-center rounded-full border-[0.4rem] border-primary-500 px-[4rem]">
                <span className="text-[6rem] font-normal leading-[7.261rem] tracking-[0.015em] text-primary-500">
                  MY Library
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-[2.2rem]">
              <h1 className="text-[2rem] font-normal leading-[2.42rem] tracking-[-0.01em] text-primary-500">
                깃허브와 연동하여 내 코드 파일을 불러오세요.
              </h1>

              <div className="relative mt-[4rem] flex w-full flex-col items-center">
                <Button onClick={handleButtonClick} className="relative z-10">
                  Login
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 top-[60rem] w-full bg-white bg-opacity-70" />
        </div>
      </div>
    </div>
  );
}
