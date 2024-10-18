export default function ReposDetailSkeleton() {
  return (
    <div className="flex animate-pulse justify-center">
      <div className="relative flex w-fit flex-col items-center justify-center gap-[2rem]">
        <div id="title" className="flex items-center gap-[1.6rem]">
          <div className="h-[7.9rem] w-[7.9rem] rounded-full bg-gray-300" />
          <div className="h-[7.9rem] w-[118rem] rounded-full bg-gray-300" />
        </div>
        <div className="flex gap-[2.8rem]">
          <div id="repoSide" className="mb-[2rem] flex h-[103.2rem] flex-col gap-[2.8rem]">
            <div className="h-[8.46rem] w-[24.7rem] rounded-[0.8rem] bg-gray-300" />
            <div className="flex h-[11.6rem] w-[24.7rem] flex-col justify-center gap-[1.6rem] pl-[0.8rem] pr-[0.8rem]">
              <div className="h-[3rem] w-[23.1rem] rounded-[2rem] bg-gray-300" />
              <div className="h-[3rem] w-[23.1rem] rounded-[2rem] bg-gray-300" />
              <div className="h-[3rem] w-[23.1rem] rounded-[2rem] bg-gray-300" />
            </div>
            <div className="h-[103.2rem] w-[24.7rem] rounded-[1.2rem] bg-gray-300" />
          </div>
          <div id="content" className="h-[105.2rem] w-[100rem] rounded-[1.2rem] bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
