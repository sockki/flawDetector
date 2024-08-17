import Image from 'next/image';
import headerLogo from '@/public/icons/headerLogo.svg';

export default function Header() {
  return (
    <header
      title="Header"
      className="fixed top-0 z-50 flex h-[13.7rem] w-full items-center justify-between backdrop-blur-sm"
    >
      <div className="text- ml-[8rem] flex items-center">
        <h1>
          <Image src={headerLogo} alt="logo" />
        </h1>
        <span className="ml-[10rem] text-[1.8rem] font-[500] text-[#3f3f3f]">취약점 DB</span>
      </div>
      <div className="mr-[8rem] text-[1.8rem] font-[500] text-[#3f3f3f]">MY 저장소</div>
    </header>
  );
}
