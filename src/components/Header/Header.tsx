import Image from 'next/image';
import headerLogo from '@/public/icons/headerLogo.svg';

export default function Header() {
  return (
    <header
      title="Header"
      className="fixed top-0 w-full h-[13.7rem] flex justify-between items-center backdrop-blur-sm z-50"
    >
      <div className="ml-[8rem] flex items-center text-">
        <Image src={headerLogo} alt="logo" />
        <span className="ml-[10rem] font-[500] text-[1.8rem] text-[#3f3f3f]">취약점 DB</span>
      </div>
      <div className="">
        <span className="mr-[8rem] font-[500] text-[1.8rem] text-[#3f3f3f]">MY 저장소</span>
      </div>
    </header>
  );
}
