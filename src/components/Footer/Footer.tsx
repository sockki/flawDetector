import Image from 'next/image';
import spacSpaceLogo from '../../../public/icons/spacSpaceLogo.svg';

export default function Footer() {
  return (
    <footer className="relative bottom-0 flex flex-col w-full h-[32.4rem] text-[#3F3F3F] font-[500]  pl-[8rem] bg-[url('/icons/footerBackground.svg')]">
      <Image src={spacSpaceLogo} alt="spacspace" className="mt-[6rem]" />
      <span className="text-[2rem] font-[600] mt-[3.7rem]">CONTACT</span>
      <div className="flex justify-between">
        <div className="mt-[0.8rem] flex">
          <div className="flex flex-col gap-[0.4rem]">
            <div className="flex">
              <span className="text-[1.6rem] text-[#969696]">(주)스팩스페이스</span>
              <div className="flex ml-[2.6rem]">
                <span className="text-[1.6rem] text-[#969696]">대표자</span>
                <span className="text-[1.6rem] ml-[1.1rem]">염민호</span>
              </div>
            </div>
            <span className="text-[1.6rem]">서울 강서구 마곡중앙2로 11, 3층 303호</span>
            <div>
              <span className="text-[1.6rem] text-[#969696]">Email</span>
              <span className="text-[1.6rem] ml-[2.3rem]">admin@sfacspace.com</span>
            </div>
          </div>
          <div className="ml-[4rem] flex flex-col gap-[0.4rem]">
            <div>
              <span className="text-[1.6rem] text-[#969696]">사업자 등록번호</span>
              <span className="text-[1.6rem] ml-[0.7rem]">450-87-01864</span>
            </div>
            <div>
              <span className="text-[1.6rem] text-[#969696]">대표전화</span>
              <span className="text-[1.6rem] ml-[1.3rem]">02-6217-1119</span>
            </div>
            <div>
              <span className="text-[1.6rem] text-[#969696]">팩스</span>
              <span className="text-[1.6rem] ml-[3rem]">02-6217-1115</span>
            </div>
          </div>
        </div>
        <div className="mt-[2.2rem] mr-[8rem]">
          <div className="flex gap-[3.2rem] text-[1.6rem] text-[#969696] underline cursor-pointer">
            <span>회사소개</span>
            <span>서비스이용약관</span>
            <span>개인정보처리방침</span>
          </div>
          <div className="w-full text-end mt-[1.2rem]">
            <span className="text-[1.2rem]">Ⓒ Spacspace.All right reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
