import Image from 'next/image';
import Link from 'next/link';
import spacSpaceLogo from '@/public/icons/spacSpaceLogo.svg';

export default function Footer() {
  return (
    <footer className="relative bottom-0 flex flex-col w-full h-[32.4rem] bg-[#FAF8FF] text-[#3F3F3F] font-medium pl-[8rem] bg-[url('/icons/footerBackground.svg')]">
      <h1>
        <Image src={spacSpaceLogo} alt="spacspace" className="mt-[6rem]" />
      </h1>
      <span className="text-[2rem] font-bold mt-[3.7rem]">CONTACT</span>
      <div className="flex justify-between text-[1.6rem]">
        <address className="mt-[0.8rem] flex not-italic">
          <div className="flex flex-col gap-[0.4rem]">
            <div className="flex">
              <span className="text-[#969696]">(주)스팩스페이스</span>
              <div className="flex ml-[2.6rem]">
                <span className="text-[#969696]">대표자</span>
                <span className="ml-[1.1rem]">염민호</span>
              </div>
            </div>
            <span>서울 강서구 마곡중앙2로 11, 3층 303호</span>
            <div>
              <span className="text-[#969696]">Email</span>
              <a href="mailto:admin@sfacspace.com" className="text-[1.6rem] ml-[2.3rem]">
                admin@sfacspace.com
              </a>
            </div>
          </div>
          <div className="ml-[4rem] flex flex-col gap-[0.4rem]">
            <div>
              <span className="text-[#969696]">사업자 등록번호</span>
              <span className="ml-[0.7rem]">450-87-01864</span>
            </div>
            <div>
              <span className="text-[#969696]">대표전화</span>
              <span className="ml-[1.3rem]">02-6217-1119</span>
            </div>
            <div>
              <span className="text-[#969696]">팩스</span>
              <span className="ml-[3rem]">02-6217-1115</span>
            </div>
          </div>
        </address>
        <div className="mt-[2.2rem] mr-[8rem]">
          <nav className="text-[#969696] underline cursor-pointer">
            <ul className="flex gap-[3.2rem]">
              <li>
                <Link href="/">회사소개</Link>
              </li>
              <li>
                <Link href="/">서비스이용약관</Link>
              </li>
              <li>
                <Link href="/">개인정보처리방침</Link>
              </li>
            </ul>
          </nav>
          <div className="w-full text-end mt-[1.2rem]">
            <span className="text-[1.2rem]">Ⓒ Spacspace.All right reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
