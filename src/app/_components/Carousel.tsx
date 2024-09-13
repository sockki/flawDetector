'use client';

import Image from 'next/image';

import {
  carouselEmoji1,
  carouselEmoji2,
  carouselEmoji3,
  carouselEmoji4,
  carouselEmoji5,
  carouselEmoji6,
} from '@/public/index';
import Marquee from 'react-fast-marquee';
import { twMerge } from 'tailwind-merge';

const cards = [
  {
    title: '사용자 데이터 보호',
    emoji: carouselEmoji1,
    texts: ['데이터 무단 액세스 및 정보 유출 방지', '개인 정보 안전하게 보호'],
    style: 'border-[#4C93FF] bg-[#E4F2FF] text-[#4C93FF]',
  },
  {
    title: '효율적인 개발',
    emoji: carouselEmoji2,
    texts: ['보안 취약점 자동 분석후 수정', '개발 집중 및 생산성 향상'],
    style: 'border-[#FF8A00] bg-[#FFFBE4] text-[#FF8A00]',
  },
  {
    title: '신속한 대응과 수정',
    emoji: carouselEmoji3,
    texts: ['발견된 취약점 대응 및 수정', '안전한 소프트웨어 개발 가능'],
    style: 'border-[#FF3D00] bg-[#FFEAE4] text-[#FF3D00]',
  },
  {
    title: '보안 강화',
    emoji: carouselEmoji4,
    texts: ['보안 취약점 사전 식별 후 해결', '소프트웨어 보안성 강화'],
    style: 'border-[#FF81A7] bg-[#FFF2F7] text-[#FF81A7]',
  },
  {
    title: '미션 크리티컬한 개발에 적합',
    emoji: carouselEmoji5,
    texts: ['미션 크리티컬한 개발 특별 제작', '안전한 솔루션 제공'],
    style: 'border-[#00987C] bg-[#DDFFF3] text-[#00987C]',
  },
  {
    title: '실시간 보안 업데이트',
    emoji: carouselEmoji6,
    texts: ['최신 보안 동향 및 취약점 정보 실시간 제공', '개발자 보안 강화를 도움'],
    style: 'border-[#A54CFF] bg-[#F5E4FF] text-[#A54CFF]',
  },
];

export default function Carousel() {
  return (
    <section className="min-h-screen w-screen overflow-hidden bg-primary-500">
      <div className="flex flex-col items-center gap-[12.1rem] py-[14.2rem]">
        <h2 className="text-center text-[6rem] font-bold leading-[7.261rem] tracking-[-0.01em] text-white">
          안전과 보호를 우선으로 하는 <br />
          프로세스를 제공합니다.
        </h2>

        <Marquee autoFill>
          {cards.map(card => (
            <div
              key={card.title}
              className="mx-[2.4rem] flex h-[46.126rem] w-[33.932rem] flex-col items-center justify-evenly rounded-[4rem] border bg-white shadow-[0rem_8rem_6rem_-4rem_rgba(0,0,0,0.25)]"
            >
              <div
                className={twMerge(
                  'flex rounded-full border px-[2.4rem] py-[0.8rem] text-center text-[2rem] font-medium',
                  card.style,
                )}
              >
                {card.title}
              </div>

              <Image width={120} height={180} src={card.emoji} alt={card.title} />

              <div className="flex flex-col items-center gap-[0.4rem] text-center text-[1.6rem] leading-[2.4rem] tracking-[-0.01em] text-neutral-60">
                {card.texts.map(text => (
                  <p key={card.title}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
