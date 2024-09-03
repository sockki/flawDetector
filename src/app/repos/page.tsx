import ReposPageHeader from '@/app/repos/_components/ReposPageHeader';
import UserCard from '@/app/repos/_components/UserCard';
import RepositoryActions from '@/app/repos/_components/RepositoryActions';
import RepositoryList from '@/app/repos/_components/RepositoryList';
import { DetectFileCardProps } from '@/types/detectedFileCard';

const dummyData: DetectFileCardProps[] = [
  {
    title: 'Folder name 1',
    label: 'before',
    date: new Date(),
    isBookmarked: false,
  },
  {
    title: 'Folder name 2',
    label: 'under',
    date: new Date(),
    isBookmarked: true,
  },
  {
    title: 'Folder name 3',
    label: 'done',
    date: new Date(),
    isBookmarked: false,
  },
  {
    title: 'Folder name 4',
    label: 'before',
    date: new Date(),
    isBookmarked: true,
  },
  {
    title: 'Folder name 5',
    label: 'under',
    date: new Date(),
    isBookmarked: false,
  },
  {
    title: 'Folder name 6',
    label: 'done',
    date: new Date(),
    isBookmarked: true,
  },
  {
    title: 'Folder name 7',
    label: 'before',
    date: new Date(),
    isBookmarked: false,
  },
  {
    title: 'Folder name 8',
    label: 'under',
    date: new Date(),
    isBookmarked: true,
  },
  {
    title: 'Folder name 9',
    label: 'done',
    date: new Date(),
    isBookmarked: false,
  },
  {
    title: 'Folder name 10',
    label: 'before',
    date: new Date(),
    isBookmarked: true,
  },
  {
    title: 'Folder name 11',
    label: 'under',
    date: new Date(),
    isBookmarked: false,
  },
  {
    title: 'Folder name 12',
    label: 'done',
    date: new Date(),
    isBookmarked: true,
  },
  {
    title: 'Folder name 13',
    label: 'before',
    date: new Date(),
    isBookmarked: false,
  },
  {
    title: 'Folder name 14',
    label: 'under',
    date: new Date(),
    isBookmarked: true,
  },
  {
    title: 'Folder name 15',
    label: 'done',
    date: new Date(),
    isBookmarked: false,
  },
  {
    title: 'Folder name 16',
    label: 'before',
    date: new Date(),
    isBookmarked: true,
  },
  {
    title: 'Folder name 17',
    label: 'under',
    date: new Date(),
    isBookmarked: false,
  },
  {
    title: 'Folder name 18',
    label: 'done',
    date: new Date(),
    isBookmarked: true,
  },
  {
    title: 'Folder name 19',
    label: 'before',
    date: new Date(),
    isBookmarked: false,
  },
  {
    title: 'Folder name 20',
    label: 'under',
    date: new Date(),
    isBookmarked: true,
  },
];

export default function ReposPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const avatarUrl = '/images/AvatarDummyImg.png';
  const email = 'marry@gmail.com';

  return (
    <div className="mx-auto bg-opacity-70 bg-[url('/images/headerBackground.svg')] bg-contain bg-top bg-no-repeat">
      <div className="mx-auto flex w-[131.4rem] flex-col items-center gap-[12.4rem]">
        <ReposPageHeader />
        <div className="flex flex-col gap-[2.8rem]">
          <UserCard avatar={avatarUrl} email={email} />
          <RepositoryActions />
          <RepositoryList searchParams={searchParams} repoData={dummyData} />
        </div>
      </div>
    </div>
  );
}
