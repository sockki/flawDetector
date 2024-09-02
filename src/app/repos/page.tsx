import ReposPageHeader from '@/app/repos/_components/ReposPageHeader';
import UserCard from '@/app/repos/_components/UserCard';
import RepositoryActions from '@/app/repos/_components/RepositoryActions';
import RepositoryList from '@/app/repos/_components/RepositoryList';

const dummyData = [
  { id: '1', title: 'Folder name 1', caption: 'caption 1' },
  { id: '2', title: 'Folder name 2', caption: 'caption 2' },
  { id: '3', title: 'Folder name 3', caption: 'caption 3' },
  { id: '4', title: 'Folder name 4', caption: 'caption 4' },
  { id: '5', title: 'Folder name 5', caption: 'caption 5' },
  { id: '6', title: 'Folder name 6', caption: 'caption 6' },
  { id: '7', title: 'Folder name 7', caption: 'caption 7' },
  { id: '8', title: 'Folder name 8', caption: 'caption 8' },
  { id: '9', title: 'Folder name 9', caption: 'caption 9' },
  { id: '10', title: 'Folder name 10', caption: 'caption 10' },
  { id: '11', title: 'Folder name 11', caption: 'caption 11' },
  { id: '12', title: 'Folder name 12', caption: 'caption 12' },
  { id: '13', title: 'Folder name 13', caption: 'caption 13' },
  { id: '14', title: 'Folder name 14', caption: 'caption 14' },
  { id: '15', title: 'Folder name 15', caption: 'caption 15' },
  { id: '16', title: 'Folder name 16', caption: 'caption 16' },
  { id: '17', title: 'Folder name 17', caption: 'caption 17' },
  { id: '18', title: 'Folder name 18', caption: 'caption 18' },
  { id: '19', title: 'Folder name 19', caption: 'caption 19' },
  { id: '20', title: 'Folder name 20', caption: 'caption 20' },
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
