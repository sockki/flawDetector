import Image from 'next/image';
import PinIcon from '@/public/icons/pinIcon.svg';
import ExternalLinkIcon from '@/public/icons/externalLinkIcon.svg';

export default function ArticleCard() {
  return (
    <div className="flex h-[25.8rem] w-[86.5rem] flex-col gap-[2.4rem] rounded-[0.8rem] border-[0.1rem] border-[#c3c3c3] p-[2.8rem]">
      <div className="flex flex-col">
        <div className="flex items-end gap-[0.8rem]">
          <label className="flex h-[3.5rem] w-[5.9rem] items-center justify-center rounded-full bg-system-warning px-[1.2] py-[0.8rem] text-[1.6rem] font-bold leading-[1.936rem] text-white">
            HOT
          </label>
          <h1 className="line-clamp-1 text-[2rem] font-regular leading-[2.42rem]">
            [취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서
          </h1>
        </div>
        <span className="mt-[0.8rem] text-[1.6rem] font-regular leading-[1.946rem] text-[#adadad]">
          Microsoft
        </span>
      </div>
      <div className="h-fit w-[80.9rem] rounded-[1.6rem] bg-gray-light p-[2rem]">
        <span className="line-clamp-2 text-[1.6rem] font-regular leading-[1.936rem] text-[#797979]">
          점점이 멀리있는
        </span>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[1.2rem]">
          <Image src={PinIcon} alt="PinIcon" />
          <Image src={ExternalLinkIcon} alt="ExternalLinkIcon" />
        </div>
        <span className="text-[1.6rem] font-regular leading-[1.936rem] text-[#a2a2a2]">2일 전</span>
      </div>
    </div>
  );
}
