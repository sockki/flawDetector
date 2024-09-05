'use client';

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

export default function Page4() {
  return (
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
  );
}

// {/* 카드 리스트 복제 */}
// <div className="relative flex animate-slide gap-[5rem] overflow-hidden whitespace-nowrap">
//   {[...cards, ...cards].map(card => (
//     <div
//       key={card.id}
//       className={`relative inline-block rounded-[4rem] border bg-white ${card.borderColor} h-[46.126rem] w-[33.932rem] shadow-lg`}
//       style={{ boxShadow: '0rem 8rem 6rem -4rem rgba(0, 0, 0, 0.25)' }}
//     >
//       <div
//         className={`absolute top-[5.191rem] ${card.bgColor} ${card.borderColor} ${card.textColor} left-1/2 h-[4.6rem] -translate-x-1/2 transform rounded-full border px-[2.4rem] py-[0.8rem] text-center`}
//       >
//         <h2 className="text-[2rem] font-medium leading-[3rem] tracking-[-0.011em]">
//           {card.title}
//         </h2>
//       </div>
//       <div className="absolute left-1/2 top-[12.501rem] flex h-[18rem] w-[12rem] -translate-x-1/2 transform items-center justify-center">
//         <span className="text-7xl">{card.emoji}</span>
//       </div>
//       <div className="absolute left-1/2 top-[34.251rem] flex h-[5.2rem] -translate-x-1/2 transform flex-col items-center gap-[0.4rem]">
//         <p className="text-center text-[1.6rem] leading-[2.4rem] tracking-[-0.01em] text-neutral-60">
//           {card.text1}
//         </p>
//         <p className="text-center text-[1.6rem] leading-[2.4rem] tracking-[-0.01em] text-neutral-60">
//           {card.text2}
//         </p>
