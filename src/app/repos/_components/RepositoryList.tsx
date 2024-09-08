'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRepoStore } from '@/stores/useRepoStore';
import type { SortOption, TypeFilterOption } from '@/types/sortAndFilter';
import { FolderSimpleStarIcon, ClockCounterIcon } from '@/public/index';
import sortAndFilterRepositories from '@/utils/sortAndFilter';
import Pagination from '@/components/Pagination/Pagination';
import DetectFileCard from '@/components/LibraryCard/DetectFileCard';
import FilterChip from '@/components/Chips/FilterChip';

type RepositoryListProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const typeOptions = ['검사완료', '검사중'];
const sortOptions = ['최신순', '오래된순', '이름순'];

export default function RepositoryList({ searchParams }: RepositoryListProps) {
  const { data: session, status } = useSession();
  const { repositories, recentViewed, setRepositories } = useRepoStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('최신순');
  const [typeFilter, setTypeFilter] = useState<TypeFilterOption>();

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

        const response = await fetch(`/api/repositories?userId=${userId}`);
        const data = await response.json();

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
  }, [userId, userName, status, setRepositories]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{isError}</div>;

  const sortedAndFilteredRepos = sortAndFilterRepositories({
    repositories,
    typeFilter,
    sortOption,
  });

  const pageData = sortedAndFilteredRepos.slice((nowPage - 1) * pageItems, nowPage * pageItems);
  const totalPage = Math.ceil(repositories.length / pageItems);

  const handleRecentsButton = () => {
    setRepositories(recentViewed);
  };

  const handleBookmarksButton = () => {
    const bookmarkRepos = repositories.filter(repo => repo.isBookmarked === true);
    setRepositories(bookmarkRepos);
  };

  return (
    <div className="flex min-h-screen flex-col gap-[2.8rem]">
      <section className="flex w-full gap-[2rem]">
        <button
          type="button"
          onClick={handleRecentsButton}
          className="flex w-full items-center justify-center gap-[1rem] rounded-[1.2rem] border border-neutral-10 bg-white p-[1.6rem] text-[2rem] font-medium text-gray-black"
        >
          <ClockCounterIcon />
          Recents File
        </button>
        <button
          type="button"
          onClick={handleBookmarksButton}
          className="flex w-full items-center justify-center gap-[1rem] rounded-[1.2rem] border border-neutral-10 bg-white p-[1.6rem] text-[2rem] font-medium text-gray-black"
        >
          <FolderSimpleStarIcon />
          Bookmarks
        </button>
      </section>
      <section className="flex flex-col gap-[2.4rem]">
        <div className="flex items-center justify-between">
          <h3 className="text-[3.2rem] font-medium text-gray-black">Library</h3>
          <div className="flex gap-[1rem]">
            <FilterChip label="Type" options={typeOptions} hasIcon onSelect={setTypeFilter} />
            <FilterChip label="Sort" options={sortOptions} hasIcon onSelect={setSortOption} />
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
