'use client';

import { Ellipse } from '@/components/Ellipse';

export default function MyComponent() {
  return (
    <div>
      <div className="relative h-[102.4rem] w-[192rem] bg-white">
        <Ellipse />
        <main className="relative z-10 flex min-h-full items-center justify-center">
          <div className="flex flex-col items-center gap-[6.5rem]">
            <div className="flex flex-col items-center justify-center gap-[4rem]">
              <div className="flex flex-col items-center justify-center gap-[2rem]">
                <h1 className="text-center text-[6rem] font-normal leading-[7.261rem] tracking-[0.015em] text-primary-500">
                  containing code files
                </h1>
                <div className="flex h-[11rem] w-[47rem] items-center justify-center gap-[1rem] rounded-full border-[0.4rem] border-[#5B21B6] px-[4rem]">
                  <span className="text-center text-[6rem] font-normal leading-[7.261rem] tracking-[0.015em] text-primary-500">
                    MY Library
                  </span>
                </div>
              </div>
              <h1 className="text-center text-[2rem] font-normal leading-[2.42rem] tracking-[-0.01em] text-primary-500">
                깃허브와 연동하여 내 코드 파일을 불러오세요.
              </h1>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="flex h-[5.6rem] items-center justify-center gap-[1rem] rounded-full bg-primary-500 px-[2.4rem] text-[2.8rem] font-light leading-[3.389rem] tracking-[-0.01em] text-white"
              >
                Login
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
