export default function VulDbDetailSkeleton() {
  return (
    <div className="mt-[3.301rem] flex animate-pulse flex-col items-center">
      <div className="flex w-[131.4rem] flex-col gap-[6rem]">
        <div className="flex flex-col border-b-[0.1rem] border-gray-middle pb-[6rem]">
          <div className="mb-[0.8rem] mt-[2.8rem] flex gap-[1rem]">
            <div className="h-[3.5rem] w-[5.7rem] rounded-full bg-gray-300" />
          </div>
          <div className="mt-[1.947rem] h-[4.35rem] w-[100rem] rounded-[2rem] bg-gray-300" />
          <div className="mt-[3.2rem] flex justify-between">
            <div className="flex gap-[3.6rem]">
              <div className="h-[3.3rem] w-[16.56rem] rounded-[2rem] bg-gray-300" />
              <div className="h-[3.3rem] w-[26.76rem] rounded-[2rem] bg-gray-300" />
            </div>
            <div className="flex gap-[2.4rem]">
              <div className="h-[3.3rem] w-[3.3rem] rounded-full bg-gray-300" />
              <div className="h-[3.3rem] w-[3.3rem] rounded-full bg-gray-300" />
            </div>
          </div>
        </div>
        <div className="max-w-[131.4rem] border-b-[0.1rem] border-gray-middle px-[1.5rem] pb-[6rem]">
          <div className="flex h-[1000rem] w-full flex-col rounded-[2rem] bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
