import { LeftIcon } from '@/public/index';

type TilteProps = {
  repoName: string;
};

export function Title({ repoName = 'sfacweb-1' }: TilteProps) {
  const containerStyles =
    'flex h-[7.9rem] w-[176rem] items-center gap-[2.4rem] rounded-full border-[0.4rem] border-primary-500 bg-white p-[2rem] text-[4rem] text-primary-500';
  return (
    <div className={containerStyles}>
      <LeftIcon />
      {repoName}
    </div>
  );
}
