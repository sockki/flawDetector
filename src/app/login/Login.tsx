'use client';

import { Ellipse } from '@/components/Ellipse';

export default function UiLogin() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-white">
      <Ellipse />

      <div className="relative z-10 flex h-[20.3rem] w-[140.6rem] items-center justify-between">
        <div className="flex h-[20.3rem] w-[43.8rem] flex-col items-center gap-[2rem]">
          <h1 className="text-[6rem] text-primary-500">Find your Flaw,</h1>

          <button
            type="button"
            className="flex h-[11rem] w-[24rem] items-center justify-center rounded-full border-2 border-primary-500 text-[6rem] text-primary-500"
          >
            Login
          </button>
        </div>

        <button
          type="button"
          className="h-[5.6rem] w-[35.4rem] rounded-full bg-primary-500 text-[2.8rem] text-white"
        >
          Github로 연동 로그인하기
        </button>

        <button
          type="button"
          className="h-[5.6rem] w-[12.2rem] rounded-full bg-primary-500 text-[2.4rem] text-white"
        >
          Github
        </button>
      </div>
    </div>
  );
}
