export default function LogoLoading() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative h-[10rem] w-[48rem] bg-white">
        {/* <LogoIcon className="absolute left-0 top-1/2" /> */}
        <div className="absolute left-0 top-0 text-[4rem]">Loading ...</div>
        <div className="absolute left-0 flex h-full w-full items-center">
          <div className="h-24 w-24 animate-move-circle rounded-full bg-white mix-blend-difference" />
        </div>
      </div>
    </div>
  );
}
