import Image from 'next/image';
import dbCardArrow from '@/public/icons/dbCardArrow.svg';

type DBCardProps = {
  title: string;
  date: string;
  id: number;
};

export default function DBCard({ title, date, id }: DBCardProps) {
  return (
    <div
      className={`group flex h-[39rem] w-[31.6rem] rounded-[2rem] bg-[linear-gradient(360deg,rgba(0,0,0,0.7),rgba(255,255,255,0)),url('/images/DBCardDummyImg${id}.png')] bg-cover p-[3.6rem] transition-all duration-500 ease-in-out hover:w-[62.5rem]`}
    >
      <div className="flex w-full items-end justify-between">
        <div className="flex w-[13.6rem] flex-col gap-[0.8rem] group-hover:w-[42rem]">
          <span className="text-[1.8rem] font-bold leading-[2.178rem] text-white group-hover:text-[2.8rem] group-hover:leading-[3.389rem]">
            {title}
          </span>
          <span className="text-[1.2rem] font-medium text-gray-text group-hover:text-[2rem]">
            {date}
          </span>
        </div>
        <Image src={dbCardArrow} alt="dbCardArrow" className="cursor-pointer" />
      </div>
    </div>
  );
}
