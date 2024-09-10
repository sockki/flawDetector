'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRepoStore } from '@/stores/useRepoStore';
import type { SortOption, TypeFilterOption } from '@/types/sortAndFilter';
import Pagination from '@/components/Pagination/Pagination';
import DetectFileCard from '@/components/LibraryCard/DetectFileCard';
import FilterChip from '@/components/Chips/FilterChip';

type RepositoryListProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const typeOptions = ['검사완료', '검사중'];
const sortOptions = ['최신순', '오래된순', '이름순'];

const perPage = 16;

export default function RepositoryList({ searchParams }: RepositoryListProps) {
  const { data: session, status } = useSession();
  const { setRepositories, filteredRepositories, setFilteredRepositories } = useRepoStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('최신순');
  const [, setTypeFilter] = useState<TypeFilterOption>();

  const userName = session?.user?.name || '';
  const nowPage = searchParams.page ? Number(searchParams.page) : 1;

  useEffect(() => {
    async function loadRepositories() {
      if (!userName) {
        return;
      }
      setIsLoading(true);

      try {
        await fetch('/api/repositories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userName }),
        });

        const response = await fetch(
          `/api/repositories?userName=${userName}&sortOption=${sortOption}`,
        );
        const data = await response.json();

        setRepositories(data.repositories);
        setFilteredRepositories(data.repositories);
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
  }, [userName, status, sortOption, setRepositories, setFilteredRepositories]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }

  const totalPage = Math.ceil((filteredRepositories?.length || 0) / perPage);
  const pageData = filteredRepositories
    ? filteredRepositories.slice((nowPage - 1) * perPage, nowPage * perPage)
    : [];

  const handleSortSelect = (v: string) => {
    setSortOption(v as SortOption);
  };

  const handleTypeSelect = (v: string) => {
    setTypeFilter(v as TypeFilterOption);
  };

  return (
    <div className="flex min-h-screen min-w-[131.4rem] flex-col gap-[2.8rem]">
      <section className="flex flex-col gap-[2.4rem]">
        <div className="flex items-center justify-between">
          <h3 className="text-[3.2rem] font-medium text-gray-black">Library</h3>
          <div className="flex gap-[1rem]">
            <FilterChip label="Type" options={typeOptions} hasIcon onSelect={handleTypeSelect} />
            <FilterChip label="Sort" options={sortOptions} hasIcon onSelect={handleSortSelect} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-[2.4rem]">
          {pageData.map(repo => (
            <DetectFileCard
              key={repo.id}
              title={repo.name}
              label={repo.isChecked}
              date={repo.pushedAt}
              userName={userName}
              repoId={repo.id}
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
