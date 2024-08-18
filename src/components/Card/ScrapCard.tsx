export default function ScrapCard() {
  return (
    <div className="relative flex h-[21.7rem] w-[42.2rem] flex-col rounded-[0.8rem] border-[0.1rem] border-[#c3c3c3] bg-white p-[2.8rem]">
      <label className="flex h-[3.5rem] w-fit items-center justify-center rounded-full bg-gray-light px-[1.2rem] py-[0.8rem] text-[1.6rem] font-bold leading-[1.936rem] text-gray-lightText">
        label
      </label>
      <div className="mt-[0.8rem] flex h-[7.2rem] w-[35.566rem] items-center">
        <span className="line-clamp-2 text-wrap text-[2.4rem] font-medium leading-[3.6rem]">
          Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서 및 기타 취약점에 대한 보고서
        </span>
      </div>
      <span className="absolute bottom-[2.8rem] text-[1.6rem] font-regular leading-[2.24rem] text-gray-lightText">
        2024.03.08 13:30:24
      </span>
    </div>
  );
}
