'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { LandingSampleImg } from '@/public/index';

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
      <div className="h-[102.3rem] flex-1">
        <div className="relative h-[182.4rem] w-[98.5rem]">
          <Image src={LandingSampleImg} alt="랜딩 이미지" className="absolute top-[17.4rem]" />
          <span
            className={`absolute left-[25rem] top-[33.6rem] z-20 flex items-center justify-center rounded-[1.287rem] bg-[#A66FFF] px-[2rem] py-[1rem] text-left text-[2.574rem] leading-[3.604rem] text-white shadow-[0_3.862rem_5.793rem_0_rgba(0,0,0,0.25)] transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            1. XSS (Cross-Site Scripting) Vulnerability
          </span>
          <span
            className={`absolute left-[20.8rem] top-[42.5rem] z-20 flex items-center justify-center rounded-[1.287rem] bg-[#A66FFF] px-[2rem] py-[1rem] text-left text-[2.574rem] leading-[3.604rem] text-white shadow-[0_3.862rem_5.793rem_0_rgba(0,0,0,0.25)] transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Insecure Password Handling
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-[3.4rem]">
        <h1
          className="whitespace-nowrap text-right text-[6rem] leading-[7.3rem] tracking-[-0.01em] text-primary-500"
          style={{ fontWeight: 700 }}
        >
          최신 보안 동향을
          <br />
          실시간으로 확인하세요.
        </h1>
        <p className="text-right text-[2rem] font-medium leading-[2.42rem] tracking-[-0.01em] text-gray-default">
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
