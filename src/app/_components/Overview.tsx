'use client';

import { LandingSampleImg } from '@/public/index';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Overview() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.5,
      },
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[102.3rem] w-full items-center justify-between gap-[8.8rem] overflow-hidden bg-white px-[14.5rem]"
    >
      <div className="h-[102.3rem] flex-1 text-[2.574rem] text-white">
        <div className="relative h-[182.4rem] w-[91.2rem]">
          <Image src={LandingSampleImg} alt="랜딩 이미지" className="absolute top-[17.4rem]" />
          <span
            className={twMerge(
              `absolute left-[25rem] top-[33.6rem] rounded-[1.287rem] bg-[#A66FFF] px-[2rem] py-[1rem] leading-[3.604rem] shadow-[0_3.862rem_5.793rem_0_rgba(0,0,0,0.25)] transition-opacity duration-[1000ms]`,
              isVisible ? 'opacity-100' : 'opacity-0',
            )}
          >
            1. XSS (Cross-Site Scripting) Vulnerability
          </span>
          <span
            className={twMerge(
              'absolute left-[20.8rem] top-[42.5rem] rounded-[1.287rem] bg-[#A66FFF] px-[2rem] py-[1rem] leading-[3.604rem] shadow-[0_3.862rem_5.793rem_0_rgba(0,0,0,0.25)] transition-opacity duration-[3000ms]',
              isVisible ? 'opacity-100' : 'opacity-0',
            )}
          >
            Insecure Password Handling
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[3.4rem]">
        <h2
          data-aos="fade-up"
          className="text-right text-[6rem] font-[700] leading-[7.3rem] tracking-[-0.01em] text-primary-500"
        >
          최신 보안 동향을
          <br />
          실시간으로 확인하세요.
        </h2>
        <p data-aos="fade-up" className="text-right text-[2rem] text-gray-default">
          실시간으로 최신 보안 동향을 제공하여
          <br />
          개발자들이 보안 취약점에 대한 최신 정보를 받을 수 있어
          <br />
          보안 강화를 위한 코딩 관행을 지속적으로 개선할 수 있습니다.
        </p>
      </div>
    </section>
  );
}
