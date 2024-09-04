'use client';

import Button from '@/components/Button/Button';
import { Ellipse } from '@/components/Ellipse';
import { FloatingButton } from '@/components/Floating/FloatingButton';
import { LandingBugIcon, LandingDownIcon, landingSampleImg } from '@/public/index';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const cards = [
  {
    title: '사용자 데이터 보호',
    emoji: '✋🏻',
    texts: ['데이터 무단 액세스 및 정보 유출 방지', '개인 정보 안전하게 보호'],
    style: {
      borderColor: 'border-[#4C93FF]',
      bgColor: 'bg-[#E4F2FF]',
      textColor: 'text-[#4C93FF]',
    },
  },
  {
    title: '효율적인 개발',
    emoji: '🔄',
    texts: ['보안 취약점 자동 분석후 수정', '개발 집중 및 생산성 향상'],
    style: {
      borderColor: 'border-[#FF8A00]',
      bgColor: 'bg-[#FFFBE4]',
      textColor: 'text-[#FF8A00]',
    },
  },
  {
    title: '신속한 대응과 수정',
    emoji: '✅️',
    texts: ['발견된 취약점 대응 및 수정', '안전한 소프트웨어 개발 가능'],
    style: {
      borderColor: 'border-[#FF3D00]',
      bgColor: 'bg-[#FFEAE4]',
      textColor: 'text-[#FF3D00]',
    },
  },
  {
    title: '보안 강화',
    emoji: '🔐',
    texts: ['보안 취약점 사전 식별 후 해결', '소프트웨어 보안성 강화'],
    style: {
      borderColor: 'border-[#FF81A7]',
      bgColor: 'bg-[#FFF2F7]',
      textColor: 'text-[#FF81A7]',
    },
  },
  {
    title: '미션 크리티컬한 개발에 적합',
    emoji: '⚙️',
    texts: ['미션 크리티컬한 개발 특별 제작', '안전한 솔루션 제공'],
    style: {
      borderColor: 'border-[#00987C]',
      bgColor: 'bg-[#DDFFF3]',
      textColor: 'text-[#00987C]',
    },
  },
  {
    title: '실시간 보안 업데이트',
    emoji: '🔏',
    texts: ['최신 보안 동향 및 취약점 정보 실시간 제공', '개발자 보안 강화를 도움'],
    style: 'border-[#A54CFF] bg-[#F5E4FF] text-[#A54CFF]',
  },
];

export default function UiLoginAndSecondPage() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = false; // 인증 상태를 여기서 처리
      setIsAuthenticated(auth);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    if (isAuthenticated) {
      router.push('/my-library');
    } else {
      router.push('/login');
    }
  };

  const handleDownIconClick = () => {
    if (secondSectionRef.current) {
      secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* 첫번째 섹션 시작 */}
      <div ref={sectionRef} className="relative h-[102.4rem] w-full overflow-hidden">
        <Ellipse />

        <section className="min-h-full content-center">
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
            <div className="flex flex-col items-center">
              <Button onClick={handleButtonClick}>
                {isAuthenticated ? '파일 분석하러 가기' : 'Login'}
              </Button>
            </div>
            <div
              className="flex h-[5.6rem] w-[5.6rem] cursor-pointer items-center justify-center"
              onClick={handleDownIconClick}
            >
              <div className="relative left-[0.875rem] top-[0.875rem] h-[3.85rem] w-[3.85rem]">
                <LandingDownIcon className="h-14 w-14" alt="Down Icon" />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* 2 */}
      <section
        ref={secondSectionRef}
        className="flex w-full items-center justify-between bg-primary-50 p-[27.5rem_19.2rem]"
      >
        <div className="flex w-[60.1rem] flex-col gap-[3rem]">
          <div className="text-left text-[8rem] font-bold leading-[9.6rem] tracking-[-0.01em] text-primary-500">
            쉽고 편하게 <br /> 취약점을 발견
          </div>
          <div className="flex flex-col gap-[2.8rem]">
            <div className="text-left text-[3.2rem] font-bold leading-[3.8rem] tracking-[-0.01em] text-neutral-100">
              코드 보안 <br /> 어떻게 관리하시나요?
            </div>
            <div className="text-left text-[2rem] font-medium leading-[2.4rem] text-[#9C6FA8]">
              플로디텍터는 안전한 소프트웨어 개발을 위한 필수 도구로, <br />
              코드의 보안 취약점을 사전에 수정함으로써 <br />
              개발자들에게 편의와 안전한 개발 환경을 제공합니다.
            </div>
          </div>
        </div>
        <div className="flex w-fit items-center justify-center rounded-[0.8rem] bg-white p-[9.3rem_9.5rem] shadow-[0_6.0rem_6rem_-2.4rem_rgba(97,0,255,0.25)]">
          <LandingBugIcon hight={196} width={190} />
        </div>
      </section>
      {/* 3 */}
      <section className="flex min-h-[102.3rem] w-full items-center justify-between gap-[8.8rem] overflow-hidden bg-white px-[14.5rem]">
        <div className="h-[102.3rem] flex-1">
          <div className="relative h-[182.4rem] w-[98.5rem]">
            <Image src={landingSampleImg} alt="랜딩 이미지" className="absolute top-[17.4rem]" />
            <span
              className={`absolute left-[25rem] top-[33.6rem] z-20 flex items-center justify-center rounded-[1.287rem] bg-[#A66FFF] px-[2rem] py-[1rem] text-left text-[2.574rem] leading-[3.604rem] text-white shadow-[0_3.862rem_5.793rem_0_rgba(0,0,0,0.25)] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              // eslint-disable-next-line react/jsx-no-comment-textnodes
            >
              // 1. XSS (Cross-Site Scripting) Vulnerability
            </span>
            <span
              className={`absolute left-[20.8rem] top-[42.5rem] z-20 flex items-center justify-center rounded-[1.287rem] bg-[#A66FFF] px-[2rem] py-[1rem] text-left text-[2.574rem] leading-[3.604rem] text-white shadow-[0_3.862rem_5.793rem_0_rgba(0,0,0,0.25)] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              Insecure Password Handling
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-[3.4rem]">
          <h1 className="whitespace-nowrap text-right text-[6rem] font-bold leading-[7.3rem] tracking-[-0.01em] text-primary-500">
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

      <FloatingButton type="top" className="bottom-[8.77rem] right-[10.8rem]" />

      <section className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-primary-500 py-[10rem]">
        <div className="flex flex-col items-center gap-[12.1rem]">
          <h1 className="text-center text-[6rem] font-bold leading-[7.261rem] tracking-[-0.01em] text-white">
            안전과 보호를 우선으로 하는 <br />
            프로세스를 제공합니다.
          </h1>

          <div className="relative flex animate-slide gap-[4.8rem] overflow-hidden whitespace-nowrap">
            {[...cards, ...cards, ...cards, ...cards].map(card => (
              <div
                key={card.title}
                className="relative inline-block h-[46.126rem] w-[33.932rem] flex-shrink-0 rounded-[4rem] bg-white shadow-lg"
              >
                <div
                  className={`absolute left-1/2 top-[5.191rem] -translate-x-1/2 transform rounded-full border ${card.style} h-[4.6rem] px-[2.4rem] text-center text-[2rem] font-medium leading-[3rem]`}
                >
                  {card.title}
                </div>
                <div className="absolute left-1/2 top-[12.501rem] flex h-[18rem] w-[12rem] -translate-x-1/2 transform items-center justify-center">
                  <span className="text-[7xl]">{card.emoji}</span>
                </div>
                <div className="absolute left-1/2 top-[34.251rem] flex h-[5.2rem] -translate-x-1/2 transform flex-col items-center gap-[0.4rem]">
                  {card.texts.map(text => (
                    <p
                      key={card.title}
                      className="text-center text-[1.6rem] leading-[2.4rem] tracking-[-0.01em] text-neutral-60"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
