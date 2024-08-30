'use client';

import { useSearchParams } from 'next/navigation';
import MyPageTitle from '@/app/me/_components/MyPageTitle';
import ScrapList from '@/app/me/_components/ScrapList';

const dummyData = [
  { id: '1', title: 'Folder name 1', date: new Date('2024-03-08T13:30:24') },
  { id: '2', title: 'Folder name 2', date: new Date('2024-03-08T13:30:25') },
  { id: '3', title: 'Folder name 3', date: new Date('2024-03-08T13:30:26') },
  { id: '4', title: 'Folder name 4', date: new Date('2024-03-08T13:30:27') },
  { id: '5', title: 'Folder name 5', date: new Date('2024-03-08T13:30:28') },
  { id: '6', title: 'Folder name 6', date: new Date('2024-03-08T13:30:29') },
  { id: '7', title: 'Folder name 7', date: new Date('2024-03-08T13:30:30') },
  { id: '8', title: 'Folder name 8', date: new Date('2024-03-08T13:30:31') },
  { id: '9', title: 'Folder name 9', date: new Date('2024-03-08T13:30:32') },
  { id: '10', title: 'Folder name 10', date: new Date('2024-03-08T13:30:33') },
  { id: '11', title: 'Folder name 11', date: new Date('2024-03-08T13:30:34') },
  { id: '12', title: 'Folder name 12', date: new Date('2024-03-08T13:30:35') },
  { id: '13', title: 'Folder name 13', date: new Date('2024-03-08T13:30:36') },
  { id: '14', title: 'Folder name 14', date: new Date('2024-03-08T13:30:37') },
  { id: '15', title: 'Folder name 15', date: new Date('2024-03-08T13:30:38') },
  { id: '16', title: 'Folder name 16', date: new Date('2024-03-08T13:30:39') },
  { id: '17', title: 'Folder name 17', date: new Date('2024-03-08T13:30:40') },
  { id: '18', title: 'Folder name 18', date: new Date('2024-03-08T13:30:41') },
  { id: '19', title: 'Folder name 19', date: new Date('2024-03-08T13:30:42') },
  { id: '20', title: 'Folder name 20', date: new Date('2024-03-08T13:30:43') },
];

export default function Page() {
  const searchParams = useSearchParams();
  const nowPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const pageItems = 16;
  const pageData = dummyData.slice((nowPage - 1) * pageItems, nowPage * pageItems);
  const totalPage = Math.ceil(dummyData.length / pageItems);

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center gap-[12.4rem]">
      <MyPageTitle title="Clipping Article" />
      <ScrapList nowPage={nowPage} totalPage={totalPage} scrapData={pageData} />
    </div>
  );
}
