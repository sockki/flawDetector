'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Ellipse } from '../../components/Ellipse';

export default function UiMyLibrary() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    router.push('./UiLogin');
  };

  return (
    <div>
      <div className="relative h-[102.4rem] w-[192rem] bg-white" ref={sectionRef}>
        <Ellipse />

        <div className="absolute inset-0 z-0 bg-[url('/icons/landingpageBackground.svg')] bg-contain bg-center bg-no-repeat" />

        <main className="relative z-10 flex min-h-full items-center justify-center">
          <div className="absolute left-[67.5rem] top-[32.95rem] flex flex-col items-center gap-[6rem]">
            <div className="flex flex-col items-center justify-center gap-[4rem]">
              <h1 className="text-center text-[6rem] font-light leading-[7.261rem] tracking-[-0.01em] text-primary-500">
                containing code files
              </h1>

              <div className="flex h-[11rem] items-center justify-center gap-[1rem] rounded-full border-[0.4rem] border-primary-500 px-[4rem]">
                <span className="text-center text-[6rem] font-normal leading-[7.261rem] tracking-[-0.01em] text-primary-500">
                  MY Library
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-[2.2rem]">
              <h1 className="text-center text-[2rem] font-normal leading-[2.42rem] tracking-[-0.01em] text-primary-500">
                깃허브와 연동하여 내 코드 파일을 불러오세요.
              </h1>

              <button
                type="button"
                className="flex items-center justify-center gap-[1rem] rounded-full bg-primary-500 px-[2.4rem] py-[1.6rem] text-center text-[2.8rem] font-light leading-[3.389rem] tracking-[-0.01em] text-white transition-transform duration-100 ease-out"
                onClick={handleButtonClick}
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
