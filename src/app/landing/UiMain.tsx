'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { LandingDownIcon, LandingBugIcon } from '@/public/index'; // 경로 확인

export default function CombinedComponent() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 로그인 상태 확인 로직 (예시)
  useEffect(() => {
    const checkAuth = async () => {
      const auth = false; // 로그인 상태 체크 로직
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
    router.push(isAuthenticated ? '/UiMyLibrary' : '/UILogin');
  };

  const cards = [
    {
      id: 1,
      title: '접근 제한',
      emoji: '✋🏻',
      text1: '접근 제어 관리',
      text2: '인증 시스템',
      borderColor: 'border-yellow-500',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-500',
    },
    {
      id: 2,
      title: '시스템 업데이트',
      emoji: '🔄',
      text1: '지속적 개선',
      text2: '업데이트 관리',
      borderColor: 'border-indigo-500',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-500',
    },
    {
      id: 3,
      title: '보안 점검',
      emoji: '🔒',
      text1: '보안 강화',
      text2: '정기 점검',
      borderColor: 'border-green-500',
      bgColor: 'bg-green-100',
      textColor: 'text-green-500',
    },
    {
      id: 4,
      title: '데이터 백업',
      emoji: '💾',
      text1: '자동 백업',
      text2: '복구 관리',
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-500',
    },
    {
      id: 5,
      title: '위험 분석',
      emoji: '⚠️',
      text1: '위험 식별',
      text2: '위기 관리',
      borderColor: 'border-red-500',
      bgColor: 'bg-red-100',
      textColor: 'text-red-500',
    },
    {
      id: 6,
      title: '사용자 교육',
      emoji: '🎓',
      text1: '보안 교육',
      text2: '인식 개선',
      borderColor: 'border-orange-500',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-500',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
  };

  const calculatePosition = (positionIndex: number) => {
    if (positionIndex === 0) {
      return '50%';
    } else if (positionIndex === -1 || positionIndex === cards.length - 1) {
      return '30%';
    } else if (positionIndex === -2 || positionIndex === cards.length - 2) {
      return '10%';
    } else if (positionIndex === 1 || positionIndex === -(cards.length - 1)) {
      return '70%';
    } else if (positionIndex === 2 || positionIndex === -(cards.length - 2)) {
      return '90%';
    } else {
      return '50%';
    }
  };

  const getClassNames = (positionIndex: number) => {
    if (positionIndex === 0) {
      return 'transform scale-100 z-20 opacity-100';
    } else if (
      positionIndex === -1 ||
      positionIndex === 1 ||
      positionIndex === cards.length - 1 ||
      positionIndex === -(cards.length - 1)
    ) {
      return 'transform scale-100 z-10 opacity-75';
    } else if (
      positionIndex === -2 ||
      positionIndex === 2 ||
      positionIndex === cards.length - 2 ||
      positionIndex === -(cards.length - 2)
    ) {
      return 'transform scale-100 z-0 opacity-50';
    } else {
      return 'opacity-0 pointer-events-none';
    }
  };

  return (
    <div>
      {/* 첫 번째 페이지 */}
      <div className="relative h-[1024px] w-[1920px] bg-white" ref={sectionRef}>
        <div className="absolute inset-0 z-0 bg-[url('/icons/landingpageBackground.svg')] bg-contain bg-center bg-no-repeat" />

        <main className="relative z-10 flex min-h-full items-center justify-center">
          <div className="flex flex-col items-center gap-[65px]">
            <div className="flex flex-col items-center justify-center gap-[40px]">
              <div className="flex flex-col items-center justify-center gap-[20px]">
                <h1 className="text-center text-[6rem] font-normal leading-[7.261rem] tracking-[0.015em] text-primary-500">
                  Find your Flaw,
                </h1>

                <div className="flex h-[110px] w-[470px] items-center justify-center gap-[10px] rounded-full border-[4px] border-primary-500 px-[40px]">
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
              <button
                type="button"
                className="flex h-[56px] items-center justify-center gap-[10px] rounded-full bg-primary-500 px-[24px] text-center text-[2.8rem] font-light leading-[3.389rem] tracking-[-0.01em] text-white transition-transform duration-100 ease-out"
                onClick={handleButtonClick}
              >
                {isAuthenticated ? '파일 분석하러 가기' : 'Login'}
              </button>
            </div>

            <div className="flex h-[5.6rem] w-[5.6rem] cursor-pointer items-center justify-center">
              <div className="relative left-[0.875rem] top-[0.875rem] h-[3.85rem] w-[3.85rem]">
                <LandingDownIcon className="h-14 w-14" alt="Down Icon" />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 두 번째 페이지 */}
      <section
        ref={secondSectionRef}
        className="relative flex min-h-screen items-center justify-between overflow-hidden bg-[#F2EBFF] px-[19.2rem]"
      >
        <div className="z-10 flex w-1/2 flex-col gap-[3rem]">
          <div className="text-left text-[8rem] font-bold leading-[9.682rem] tracking-[-0.01em] text-primary-500">
            쉽고 편하게 <br /> 취약점을 발견
          </div>

          <div className="flex flex-col gap-[2.8rem]">
            <div className="text-left text-[3.2rem] font-bold leading-[3.873rem] tracking-[-0.01em] text-neutral-100">
              코드 보안 <br /> 어떻게 관리하시나요?
            </div>

            <div className="text-left text-[2rem] font-medium leading-[2.42rem] tracking-[-0.01em] text-[#9C6FA8]">
              플로디텍터는 안전한 소프트웨어 개발을 위한 필수 도구로, <br />
              코드의 보안 취약점을 사전에 수정함으로써 <br />
              개발자들에게 편의와 안전한 개발 환경을 제공합니다.
            </div>
          </div>
        </div>

        <div className="relative h-[102.2rem] w-[77.15rem]">
          <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-[1rem] rounded-[0.8rem] bg-white p-[9.3rem_9.5rem] shadow-[0_6rem_6rem_-2.4rem_rgba(97,0,255,0.25)]">
            <LandingBugIcon className="h-[19.6rem] w-[19.061rem]" alt="Bug Icon" />
          </div>

          <div className="absolute right-[-30rem] top-0 h-[20rem] w-[20rem] rounded-lg border-[0.1rem] border-primary-500" />

          <div className="absolute bottom-0 right-[-30rem] h-[20rem] w-[20rem] rounded-lg border-[0.1rem] border-primary-500" />
        </div>
      </section>

      {/* 세 번째 페이지 */}
      <section className="relative flex h-[102.3rem] min-h-[102.3rem] w-[192rem] items-center justify-between gap-[8.8rem] overflow-hidden bg-white px-[19.2rem]">
        <div className="relative -left-[10rem] h-[182.4rem] w-[98.5rem] overflow-hidden rounded-tl-[3.2rem] border border-gray-200">
          <img
            src="/images/LandingSample.png"
            alt="Landing Sample"
            className="absolute left-0 top-[50rem] h-auto w-full object-contain"
          />
          <div
            className={`absolute left-[15rem] top-[75rem] z-20 flex items-center justify-center whitespace-nowrap rounded-[1.287rem] bg-[#A66FFF] text-left text-[2.574rem] font-semibold leading-[3.604rem] tracking-[-0.01em] text-white shadow-[0_3.862rem_5.793rem_0_rgba(0,0,0,0.25)] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              padding: '1.609rem',
              gap: '16.09px',
            }}
          >
            Insecure Password Handling
          </div>
        </div>

        <div className="flex flex-col items-end gap-[3.4rem]">
          <h1 className="text-right text-[6rem] font-bold leading-[7.3rem] tracking-tight text-primary-500">
            최신 보안 동향을
            <br />
            실시간으로 확인하세요.
          </h1>

          <p className="text-right text-[2rem] font-medium leading-[2.42rem] tracking-tight text-gray-default">
            실시간으로 최신 보안 동향을 제공하여
            <br />
            개발자들이 보안 취약점에 대한 최신 정보를 받을 수 있어
            <br />
            보안 강화를 위한 코딩 관행을 지속적으로 개선할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Carousel */}
      <div className="flex min-h-screen items-center justify-center bg-[#6100FF]">
        <div
          className="flex flex-col items-center gap-[12.1rem] p-[10rem]"
          style={{ width: '192rem' }}
        >
          <h1 className="font-inter text-center text-[6rem] font-bold leading-[7.261rem] tracking-tight text-white">
            안전과 보호를 우선으로 하는 <br />
            프로세스를 제공합니다.
          </h1>

          <div className="relative flex h-[46.126rem] w-full items-center justify-center">
            <button
              onClick={prevSlide}
              type="button"
              className="absolute left-0 z-10 flex h-[1rem] w-[1rem] items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75"
            >
              &lt;
            </button>

            <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
              {cards.map(card => {
                const positionIndex = card.id - 1 - currentIndex;
                const position = calculatePosition(positionIndex);
                const classNames = getClassNames(positionIndex);

                return (
                  <div
                    key={card.id}
                    className={`absolute transition-transform duration-700 ease-in-out ${classNames}`}
                    style={{
                      width: '33.932rem',
                      height: '46.126rem',
                      boxShadow: '0 8rem 6rem -4rem rgba(0, 0, 0, 0.25)',
                      borderRadius: '4rem',
                      border: `1px solid ${card.borderColor}`,
                      backgroundColor: '#fff',
                      left: position,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div
                      className={`absolute left-[50%] top-[5.191rem] -translate-x-[50%] transform border ${card.borderColor} ${card.bgColor} ${card.textColor} rounded-[4rem] px-[1.6rem] py-[1.2rem] text-center text-[2rem] font-bold`}
                    >
                      {card.title}
                    </div>
                    <div
                      className="absolute left-[50%] top-[12.501rem] -translate-x-[50%] transform text-center"
                      style={{
                        fontSize: '12rem',
                      }}
                    >
                      {card.emoji}
                    </div>
                    <div
                      className="absolute bottom-[5rem] left-[50%] flex -translate-x-[50%] transform flex-col items-center"
                      style={{
                        gap: '0.8rem',
                      }}
                    >
                      <div
                        className="text-center text-[1.6rem] text-[#000]"
                        style={{ width: '19.7rem', height: '2.4rem' }}
                      >
                        {card.text1}
                      </div>
                      <div
                        className="text-center text-[1.6rem] text-[#000]"
                        style={{ width: '15.5rem', height: '2.4rem' }}
                      >
                        {card.text2}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={nextSlide}
              type="button"
              className="absolute right-0 z-10 flex h-[1rem] w-[1rem] items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
