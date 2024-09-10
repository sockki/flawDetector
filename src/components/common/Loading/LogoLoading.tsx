import { LoadingIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';

type LogoLoadingProp = {
  className?: string;
};

export default function LogoLoading({ className }: LogoLoadingProp) {
  return (
    <div className={twMerge('flex w-full items-center justify-center', className)}>
      <div className="relative h-[10rem] w-[45rem] bg-white">
        <LoadingIcon className="absolute left-[2.2rem] top-1/2 -translate-y-1/2" />
        {/* <div className="absolute left-0 top-0 text-[4rem]">Loading ...</div> */}
        <div className="absolute left-0 flex h-full w-full items-center">
          <div className="h-[10rem] w-[10rem] animate-move-circle rounded-full bg-white mix-blend-difference" />
        </div>
      </div>
    </div>
  );
}
