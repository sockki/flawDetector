'use client';

import { useSession } from 'next-auth/react';
import Pagination from '@/components/Pagination/Pagination';
import DetectFileCard from '@/components/LibraryCard/DetectFileCard';
import FilterChip from '@/components/Chips/FilterChip';
import { useEffect, useState } from 'react';
import { DetectFileLabelType } from '@/types/detectedFileCard';

export type Repository = {
  id: string;
  name: string;
  html_url: string;
  pushed_at: string;
  isBookmarked: boolean;
  isChecked: DetectFileLabelType;
};

type RepositoryListProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const typeOptions = ['검사완료', '검사중'];
const sortOptions = ['최신순', '오래된순', '이름순'];

export default function RepositoryList({ searchParams }: RepositoryListProps) {
  const { data: session, status } = useSession();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const userName = session?.user?.name || '';
  const userId = session?.user?.id || '';

  const pageItems = 16;
  const nowPage = searchParams.page ? Number(searchParams.page) : 1;

  useEffect(() => {
    async function loadRepositories() {
      if (!userId || !userName) {
        return;
      }

      setIsLoading(true);

      try {
        await fetch('/api/repositories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            userName,
          }),
        });

        const res = await fetch(`/api/repositories?userId=${userId}`);
        const data = await res.json();

        setRepositories(data.repositories);
      } catch (error) {
        console.error('레포지토리 가져오기 실패:', error);
        setIsError('레포지토리 목록을 가져오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    }

    if (status === 'authenticated') {
      loadRepositories();
    }
  }, [userId, userName, status]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{isError}</div>;

  const pageData = repositories.slice((nowPage - 1) * pageItems, nowPage * pageItems);
  const totalPage = Math.ceil(repositories.length / pageItems);

  return (
    <div className="flex min-h-screen flex-col gap-[2.8rem]">
      <section className="flex flex-col gap-[2.4rem]">
        <div className="flex items-center justify-between">
          <h3 className="text-[3.2rem] font-medium text-gray-black">Library</h3>
          <div className="flex gap-[1rem]">
            <FilterChip label="Type" options={typeOptions} hasIcon onSelect={() => {}} />
            <FilterChip label="Sort" options={sortOptions} hasIcon onSelect={() => {}} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-[2.4rem]">
          {pageData.map(repo => (
            <DetectFileCard
              key={repo.id}
              title={repo.name}
              label={repo.isChecked}
              date={new Date(repo.pushed_at)}
              isBookmarked={repo.isBookmarked}
              userId={userId}
              userName={userName}
              repoId={repo.id}
              setRepositories={setRepositories}
            />
          ))}
        </div>
        <div className="mx-auto">
          <Pagination nowPage={nowPage} totalPage={totalPage} />
        </div>
      </section>
    </div>
  );
}
