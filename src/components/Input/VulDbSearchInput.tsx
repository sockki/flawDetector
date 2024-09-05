import { SearchIcon } from '@/public/index';

export default function VulDbSearchInput() {
  return (
    <div className="flex h-[8.2rem] w-[131.3rem] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(91.33deg,#6100FF,#4F6BFF)] p-[0.2rem]">
      <form className="flex h-full w-full items-center gap-[1rem] rounded-[1.16rem] bg-white p-[2.4rem]">
        <input
          className="h-full w-full text-[2.4rem] font-regular leading-[3.36rem] placeholder:text-[#d6d6d6] focus:outline-none"
          placeholder="검색어를 입력해주세요"
        />
        <button type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
