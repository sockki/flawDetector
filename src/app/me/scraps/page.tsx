import MePageTitle from '@/app/me/_components/MePageTitle';
import ScrapList from '@/app/me/_components/ScrapList';
import { ScrapCardProps } from '@/types/scrapCard';

const dummyData: ScrapCardProps[] = [
  { title: 'Folder name 1', date: new Date('2024-03-08T13:30:24'), label: 'warning' },
  { title: 'Folder name 2', date: new Date('2024-03-08T13:30:25'), label: 'notification' },
  { title: 'Folder name 3', date: new Date('2024-03-08T13:30:26'), label: 'report' },
  { title: 'Folder name 4', date: new Date('2024-03-08T13:30:27'), label: 'warning' },
  { title: 'Folder name 5', date: new Date('2024-03-08T13:30:28'), label: 'notification' },
  { title: 'Folder name 6', date: new Date('2024-03-08T13:30:29'), label: 'report' },
  { title: 'Folder name 7', date: new Date('2024-03-08T13:30:30'), label: 'warning' },
  { title: 'Folder name 8', date: new Date('2024-03-08T13:30:31'), label: 'notification' },
  { title: 'Folder name 9', date: new Date('2024-03-08T13:30:32'), label: 'report' },
  { title: 'Folder name 10', date: new Date('2024-03-08T13:30:33'), label: 'warning' },
  { title: 'Folder name 11', date: new Date('2024-03-08T13:30:34'), label: 'notification' },
  { title: 'Folder name 12', date: new Date('2024-03-08T13:30:35'), label: 'report' },
  { title: 'Folder name 13', date: new Date('2024-03-08T13:30:36'), label: 'warning' },
  { title: 'Folder name 14', date: new Date('2024-03-08T13:30:37'), label: 'notification' },
  { title: 'Folder name 15', date: new Date('2024-03-08T13:30:38'), label: 'report' },
  { title: 'Folder name 16', date: new Date('2024-03-08T13:30:39'), label: 'warning' },
  { title: 'Folder name 17', date: new Date('2024-03-08T13:30:40'), label: 'notification' },
  { title: 'Folder name 18', date: new Date('2024-03-08T13:30:41'), label: 'report' },
  { title: 'Folder name 19', date: new Date('2024-03-08T13:30:42'), label: 'warning' },
  { title: 'Folder name 20', date: new Date('2024-03-08T13:30:43'), label: 'notification' },
];

export default function ScrapsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="mx-auto flex min-h-screen flex-col items-center gap-[12.4rem]">
      <MePageTitle title="Clipping Article" />
      <ScrapList searchParams={searchParams} scrapData={dummyData} />
    </div>
  );
}
