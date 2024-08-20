import { ListIcon } from '@/public/index';

type ListLibraryProps = {
  avatarUrl?: string;
  userName?: string;
};

export function ListLibrary({
  avatarUrl = 'https://avatars.githubusercontent.com/u/137901354?v=4',
  userName = 'marryfile',
}: ListLibraryProps) {
  const containerStyles =
    'flex h-[7rem] w-[24.7rem] items-center justify-between rounded-t-[0.8rem] border-b border-gray-300 bg-primary-50 p-[2.0rem]';

  const userInfoStyles = 'flex h-[3.0rem] w-fit items-center justify-around gap-[1rem]';

  const imgStyles = 'h-[3rem] w-[3rem] rounded-full';

  return (
    <div className={containerStyles}>
      <div className={userInfoStyles}>
        <img className={imgStyles} src={avatarUrl} />
        <div className="text-[2rem]">{userName}</div>
      </div>
      <ListIcon />
    </div>
  );
}
