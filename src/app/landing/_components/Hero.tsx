'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { Ellipse } from '@/components/Ellipse';
import { LandingDownIcon } from '@/public/index';

export default function Hero() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = false; // 인증 상태를 여기서 처리
      setIsAuthenticated(auth);
    };
    checkAuth();
  }, []);

  const handleButtonClick = () => {
    if (isAuthenticated) {
      router.push('/my-library');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="relative h-[102.4rem] w-full overflow-hidden">
      <Ellipse />

      <section id="hero" className="min-h-full content-center">
        <div className="flex flex-col items-center gap-[6.5rem]">
          <div className="flex flex-col items-center justify-center gap-[4rem]">
            <div className="flex flex-col items-center justify-center gap-[2rem]">
              <h1 className="text-center text-[6rem] font-normal leading-[7.261rem] tracking-[0.015em] text-primary-500">
                Find your Flaw,
              </h1>
              <div className="flex h-[11rem] w-[47rem] items-center justify-center rounded-full border-[0.4rem] border-primary-500 px-[4rem]">
                <span className="text-center text-[6rem] font-normal leading-[7.261rem] tracking-[0.015em] text-primary-500">
                  FlawDetector
                </span>
              </div>
            </div>
            <h1 className="text-center text-[2rem] font-normal leading-[2.42rem] tracking-[-0.01em] text-primary-500">
              인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게 해결하세요.
            </h1>
          </div>
          <Button onClick={handleButtonClick}>
            {isAuthenticated ? '파일 분석하러 가기' : 'Login'}
          </Button>
          <div className="flex h-[5.6rem] w-[5.6rem] items-center justify-center">
            <div className="relative left-[0.875rem] top-[0.875rem] h-[3.85rem] w-[3.85rem]">
              <LandingDownIcon className="h-14 w-14" alt="Down Icon" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
