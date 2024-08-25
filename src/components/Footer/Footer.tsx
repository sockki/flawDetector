import { SpacSpaceLogoIcon } from '@/public/index';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bottom-0 flex h-[32.4rem] w-full flex-col bg-[#FAF8FF] bg-[url('/icons/footerBackground.svg')] pl-[8rem] font-medium text-gray-black">
      <h1 className="pt-[6rem]">
        <SpacSpaceLogoIcon />
      </h1>
      <span className="mt-[3.7rem] text-[2rem] font-bold">CONTACT</span>
      <div className="flex justify-between text-[1.6rem]">
        <address className="mt-[0.8rem] flex not-italic">
          <div className="flex flex-col gap-[0.4rem]">
            <div className="flex">
              <span className="text-gray-default">(주)스팩스페이스</span>
              <div className="ml-[2.6rem] flex">
                <span className="text-gray-default">대표자</span>

                <span className="ml-[1.1rem]">염민호</span>
              </div>
            </div>
            <span>서울 강서구 마곡중앙2로 11, 3층 303호</span>
            <div>
              <span className="text-gray-default">Email</span>

              <a href="mailto:admin@sfacspace.com" className="ml-[2.3rem] text-[1.6rem]">
                admin@sfacspace.com
              </a>
            </div>
          </div>
          <div className="ml-[4rem] flex flex-col gap-[0.4rem]">
            <div>
              <span className="text-gray-default">사업자 등록번호</span>
              <span className="ml-[0.7rem]">450-87-01864</span>
            </div>
            <div>
              <span className="text-gray-default">대표전화</span>
              <span className="ml-[1.3rem]">02-6217-1119</span>
            </div>
            <div>
              <span className="text-gray-default">팩스</span>
              <span className="ml-[3rem]">02-6217-1115</span>
            </div>
          </div>
        </address>
        <div className="mr-[8rem] mt-[2.2rem]">
          <nav className="cursor-pointer text-gray-default underline">
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
          <div className="mt-[1.2rem] w-full text-end">
            <span className="text-[1.2rem]">Ⓒ Spacspace.All right reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
