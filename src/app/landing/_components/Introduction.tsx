'use client';

import { LandingBugIcon, LandingSquareImg } from '@/public/index';
import { twMerge } from 'tailwind-merge';

export default function Introduction() {
  return (
    <section
      className={twMerge(
        'relative flex h-[102.2rem] w-full items-center justify-between overflow-hidden bg-primary-50 p-[27.5rem_19.2rem]',
      )}
    >
      <div className="flex w-[60.1rem] flex-col gap-[3rem]">
        <div className="text-[8rem] font-bold leading-[9.6rem] tracking-[-0.01em] text-primary-500">
          쉽고 편하게 <br /> 취약점을 발견
        </div>
        <div className="flex flex-col gap-[2.8rem]">
          <div className="text-[3.2rem] font-bold leading-[3.8rem] tracking-[-0.01em] text-neutral-100">
            코드 보안 <br /> 어떻게 관리하시나요?
          </div>
          <div className="text-[2rem] font-medium leading-[2.4rem] text-[#9C6FA8]">
            플로디텍터는 안전한 소프트웨어 개발을 위한 필수 도구로, <br />
            코드의 보안 취약점을 사전에 수정함으로써 <br />
            개발자들에게 편의와 안전한 개발 환경을 제공합니다.
          </div>
        </div>
      </div>

      <div
        className={twMerge(
          'z-10 mr-[6rem] flex w-fit items-center justify-center rounded-[0.8rem] bg-white p-[9.3rem_9.5rem] shadow-[0_6.0rem_6rem_-2.4rem_rgba(97,0,255,0.25)]',
        )}
      >
        <LandingBugIcon height={196} width={190} className="relative z-10" />
      </div>

      <div
        className={twMerge('absolute right-0 h-full w-[102.2rem] bg-no-repeat')}
        style={{
          backgroundImage: `url(${LandingSquareImg.src})`,
          backgroundPosition: 'right -10rem center',
        }}
      />
    </section>
  );
}
