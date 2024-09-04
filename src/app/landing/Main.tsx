'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LandingDownIcon, LandingBugIcon } from '@/public/index';
import { FloatingButton } from '@/components/Floating/FloatingButton'; // 플로팅 버튼 컴포넌트 임포트
import { Ellipse } from '@/components/Ellipse';

const cards = [
  {
    id: 1,
    title: '사용자 데이터 보호',
    emoji: '✋🏻',
    text1: '데이터 무단 액세스 및 정보 유출 방지',
    text2: '개인 정보 안전하게 보호',
    borderColor: 'border-[#4C93FF]',
    bgColor: 'bg-[#E4F2FF]',
    textColor: 'text-[#4C93FF]',
  },
  {
    id: 2,
    title: '효율적인 개발',
    emoji: '🔄',
    text1: '보안 취약점 자동 분석후 수정',
    text2: '개발 집중 및 생산성 향상',
    borderColor: 'border-[#FF8A00]',
    bgColor: 'bg-[#FFFBE4]',
    textColor: 'text-[#FF8A00]',
  },
  {
    id: 3,
    title: '신속한 대응과 수정',
    emoji: '✅️',
    text1: '발견된 취약점 대응 및 수정',
    text2: '안전한 소프트웨어 개발 가능',
    borderColor: 'border-[#FF3D00]',
    bgColor: 'bg-[#FFEAE4]',
    textColor: 'text-[#FF3D00]',
  },
  {
    id: 4,
    title: '보안 강화',
    emoji: '🔐',
    text1: '보안 취약점 사전 식별 후 해결',
    text2: '소프트웨어 보안성 강화',
    borderColor: 'border-[#FF81A7]',
    bgColor: 'bg-[#FFF2F7]',
    textColor: 'text-[#FF81A7]',
  },
  {
    id: 5,
    title: '미션 크리티컬한 개발에 적합',
    emoji: '⚙️',
    text1: '미션 크리티컬한 개발 특별 제작',
    text2: '안전한 솔루션 제공',
    borderColor: 'border-[#00987C]',
    bgColor: 'bg-[#DDFFF3]',
    textColor: 'text-[#00987C]',
  },
  {
    id: 6,
    title: '실시간 보안 업데이트',
    emoji: '🔏',
    text1: '최신 보안 동향 및 취약점 정보 실시간 제공',
    text2: '개발자 보안 강화를 도움',
    borderColor: 'border-[#A54CFF]',
    bgColor: 'bg-[#F5E4FF]',
    textColor: 'text-[#A54CFF]',
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
      router.push('/UiMyLibrary');
    } else {
      router.push('/login'); // 로그인 페이지로 이동
    }
  };

  const handleDownIconClick = () => {
    if (secondSectionRef.current) {
      secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div
        ref={sectionRef}
        className="relative bg-white"
        style={{ height: '102.4rem', width: '192rem' }}
      >
        <Ellipse />
        <div className="absolute inset-0 z-0 bg-[url('/icons/landingpageBackground.svg')] bg-contain bg-center bg-no-repeat" />
        <main className="relative z-10 flex min-h-full items-center justify-center">
          <div className="flex flex-col items-center gap-[6.5rem]">
            <div className="flex flex-col items-center justify-center gap-[4rem]">
              <div className="flex flex-col items-center justify-center gap-[2rem]">
                <h1
                  className="text-center text-primary-500"
                  style={{
                    fontSize: '6rem',
                    fontWeight: 'normal',
                    lineHeight: '7.261rem',
                    letterSpacing: '0.015em',
                  }}
                >
                  Find your Flaw,
                </h1>
                <div
                  className="flex items-center justify-center rounded-full border-primary-500"
                  style={{
                    height: '11rem',
                    width: '47rem',
                    borderWidth: '0.4rem',
                    padding: '0 4rem',
                  }}
                >
                  <span
                    className="text-center text-primary-500"
                    style={{
                      fontSize: '6rem',
                      fontWeight: 'normal',
                      lineHeight: '7.261rem',
                      letterSpacing: '0.015em',
                    }}
                  >
                    FlawDetector
                  </span>
                </div>
              </div>
              <h1
                className="text-center text-primary-500"
                style={{
                  fontSize: '2rem',
                  fontWeight: 'normal',
                  lineHeight: '2.42rem',
                  letterSpacing: '-0.01em',
                }}
              >
                인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게 해결하세요.
              </h1>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="flex items-center justify-center rounded-full bg-primary-500 text-white transition-transform duration-100 ease-out"
                style={{
                  height: '5.6rem',
                  padding: '0 2.4rem',
                  fontSize: '2.8rem',
                  fontWeight: '300',
                  lineHeight: '3.389rem',
                  letterSpacing: '-0.01em',
                }}
                onClick={handleButtonClick}
              >
                {isAuthenticated ? '파일 분석하러 가기' : 'Login'}
              </button>
            </div>
            <div
              className="flex cursor-pointer items-center justify-center"
              style={{
                height: '5.6rem',
                width: '5.6rem',
              }}
              onClick={handleDownIconClick} // 클릭 시 두 번째 섹션으로 스크롤 이동
            >
              <div
                className="relative"
                style={{
                  left: '0.875rem',
                  top: '0.875rem',
                  height: '3.85rem',
                  width: '3.85rem',
                }}
              >
                <LandingDownIcon className="h-14 w-14" alt="Down Icon" />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 두 번째 섹션 */}
      <section
        ref={secondSectionRef}
        className="relative flex items-center justify-between overflow-hidden bg-primary-50 px-[192px]"
        style={{
          height: '108rem',
          width: '192rem',
        }}
      >
        <div className="z-10 flex flex-col gap-[3rem]" style={{ width: '96rem' }}>
          <div
            className="text-left text-primary-500"
            style={{
              fontSize: '8rem',
              fontWeight: 'bold',
              lineHeight: '9.6rem',
              letterSpacing: '-0.01em',
            }}
          >
            쉽고 편하게 <br /> 취약점을 발견
          </div>
          <div className="flex flex-col gap-[2.8rem]">
            <div
              className="text-left text-neutral-100"
              style={{
                fontSize: '3.2rem',
                fontWeight: 'bold',
                lineHeight: '3.8rem',
                letterSpacing: '-0.01em',
              }}
            >
              코드 보안 <br /> 어떻게 관리하시나요?
            </div>
            <div
              className="text-left"
              style={{
                fontSize: '2rem',
                fontWeight: '500',
                lineHeight: '2.4rem',
                color: '#9C6FA8',
              }}
            >
              플로디텍터는 안전한 소프트웨어 개발을 위한 필수 도구로, <br />
              코드의 보안 취약점을 사전에 수정함으로써 <br />
              개발자들에게 편의와 안전한 개발 환경을 제공합니다.
            </div>
          </div>
        </div>

        <div
          className="relative"
          style={{
            height: '102rem',
            width: '77.1rem',
          }}
        >
          <div
            className="absolute z-10 flex items-center justify-center gap-[1rem] rounded-[0.8rem] bg-white p-[9.3rem_9.5rem] shadow-[0_6.0rem_6rem_-2.4rem_rgba(97,0,255,0.25)]"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <LandingBugIcon className="h-[19.6rem] w-[19rem]" alt="Bug Icon" />
          </div>
          <div
            className="absolute rounded-lg border-primary-500"
            style={{
              height: '20rem',
              width: '20rem',
              right: '-30rem',
              top: '0',
            }}
          />
          <div
            className="absolute rounded-lg border-primary-500"
            style={{
              height: '20rem',
              width: '20rem',
              bottom: '0',
              right: '-30rem',
            }}
          />
          <div
            className="absolute rounded-lg border-primary-500"
            style={{
              height: '20rem',
              width: '20rem',
              right: '5rem',
              top: '20rem',
              transform: 'rotate(45.07deg)',
            }}
          />
          <div
            className="absolute rounded-lg border-primary-500"
            style={{
              height: '20rem',
              width: '20rem',
              bottom: '20rem',
              right: '5rem',
              transform: 'rotate(45.07deg)',
            }}
          />
        </div>
      </section>

      <section
        className="relative flex items-center justify-between gap-[8.8rem] overflow-hidden bg-white"
        style={{
          height: '102.3rem',
          minHeight: '102.3rem',
          width: '192rem',
          padding: '0 19.2rem',
        }}
      >
        <div
          className="relative rounded-tl-[3.2rem] border border-gray-200"
          style={{
            height: '182.4rem',
            width: '98.5rem',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/LandingSample.png"
            alt="Landing Sample"
            className="h-auto w-full object-contain"
            layout="fill"
            style={{ marginTop: '40rem' }}
          />
          <div
            className="absolute z-20 flex items-center justify-center whitespace-nowrap rounded-[1.287rem] bg-[#A66FFF] px-[2rem] py-[1rem] text-left text-white shadow-[0_3.862rem_5.793rem_0_rgba(0,0,0,0.25)] transition-opacity duration-1000"
            style={{
              left: '15rem',
              top: '75rem',
              fontSize: '2.574rem',
              lineHeight: '3.604rem',
              opacity: isVisible ? '1' : '0',
            }}
          >
            Insecure Password Handling
          </div>
        </div>
        <div className="flex flex-col items-end gap-[3.4rem]">
          <h1
            className="text-right text-primary-500"
            style={{
              fontSize: '6rem',
              fontWeight: 'bold',
              lineHeight: '7.3rem',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            최신 보안 동향을
            <br />
            실시간으로 확인하세요.
          </h1>
          <p
            className="text-right"
            style={{
              fontSize: '2rem',
              fontWeight: '500',
              lineHeight: '2.42rem',
              letterSpacing: '-0.01em',
              color: 'gray-default',
            }}
          >
            실시간으로 최신 보안 동향을 제공하여
            <br />
            개발자들이 보안 취약점에 대한 최신 정보를 받을 수 있어
            <br />
            보안 강화를 위한 코딩 관행을 지속적으로 개선할 수 있습니다.
          </p>
        </div>
      </section>

      <FloatingButton type="top" className="fixed bottom-[8.77rem] right-[10.8rem]" />

      <section
        className="flex min-h-screen items-center justify-center bg-primary-500"
        style={{ width: '192rem', padding: '10rem' }}
      >
        <div className="flex flex-col items-center gap-[12.1rem]">
          <h1
            className="text-center text-white"
            style={{
              fontSize: '6rem',
              fontWeight: 'bold',
              lineHeight: '7.261rem',
              letterSpacing: '-0.01em',
            }}
          >
            안전과 보호를 우선으로 하는 <br />
            프로세스를 제공합니다.
          </h1>

          <div
            className="relative flex animate-slide gap-[4.8rem] overflow-hidden whitespace-nowrap"
            style={{ overflow: 'hidden' }}
          >
            {[...cards, ...cards, ...cards, ...cards].map(card => (
              <div
                key={card.id}
                className={`relative inline-block flex-shrink-0 rounded-[4rem] bg-white ${card.borderColor} shadow-lg`}
                style={{
                  height: '46.126rem',
                  width: '33.932rem',
                  boxShadow: '0rem 8rem 6rem -4rem rgba(0, 0, 0, 0.25)',
                }}
              >
                <div
                  className={`absolute left-1/2 -translate-x-1/2 transform rounded-full border ${card.bgColor} ${card.borderColor} ${card.textColor}`}
                  style={{
                    top: '5.191rem',
                    height: '4.6rem',
                    padding: '0 2.4rem 0.8rem',
                    fontSize: '2rem',
                    lineHeight: '3rem',
                    textAlign: 'center',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '2rem',
                      fontWeight: '500',
                      lineHeight: '3rem',
                      letterSpacing: '-0.011em',
                    }}
                  >
                    {card.title}
                  </h2>
                </div>
                <div
                  className="absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center"
                  style={{ top: '12.501rem', height: '18rem', width: '12rem' }}
                >
                  <span style={{ fontSize: '7xl' }}>{card.emoji}</span>
                </div>
                <div
                  className="absolute left-1/2 flex -translate-x-1/2 transform flex-col items-center gap-[0.4rem]"
                  style={{ top: '34.251rem', height: '5.2rem' }}
                >
                  <p
                    className="text-center"
                    style={{
                      fontSize: '1.6rem',
                      lineHeight: '2.4rem',
                      letterSpacing: '-0.01em',
                      color: 'neutral-60',
                    }}
                  >
                    {card.text1}
                  </p>
                  <p
                    className="text-center"
                    style={{
                      fontSize: '1.6rem',
                      lineHeight: '2.4rem',
                      letterSpacing: '-0.01em',
                      color: 'neutral-60',
                    }}
                  >
                    {card.text2}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
