import SpinningBox from '@/components/SpinningBox';
import { BugIcon } from '@/public/index';

export default function Introduction() {
  return (
    <section
      id="intro"
      className="relative flex h-[102.2rem] w-full items-center justify-between overflow-hidden bg-primary-50 p-[27.5rem_19.2rem]"
    >
      <div className="absolute right-[-45%] top-[37.5%] z-0 flex h-full items-center justify-end">
        <SpinningBox />
      </div>

      <div className="relative z-10 flex flex-col gap-[3rem]">
        <div
          data-aos="fade-up"
          className="text-[8rem] font-[700] leading-[9.6rem] tracking-[-0.01em] text-primary-500"
        >
          쉽고 편하게 <br /> 취약점을 발견하다
        </div>
        <div data-aos="fade-up" className="flex flex-col gap-[2.8rem]">
          <div className="text-[3.2rem] font-bold text-neutral-100">
            코드 보안 <br /> 어떻게 관리하시나요?
          </div>
          <p data-aos="fade-up" className="text-[2rem] text-[#9C6FA8]">
            플로디텍터는 안전한 소프트웨어 개발을 위한 필수 도구로, <br />
            코드의 보안 취약점을 사전에 수정함으로써 <br />
            개발자들에게 편의와 안전한 개발 환경을 제공합니다.
          </p>
        </div>
      </div>

      <div
        data-aos="flip-right"
        className="relative z-10 mr-[6rem] flex w-fit items-center justify-center rounded-[0.8rem] bg-white p-[9.3rem_9.5rem] shadow-[0_6.0rem_6rem_-2.4rem_rgba(97,0,255,0.25)]"
      >
        <BugIcon height={196} width={190} stroke="#6100ff" />
      </div>
    </section>
  );
}
