'use client';

import FilterChip from '@/components/Chips/FilterChip';
import DetectFileCard from '@/components/LibraryCard/DetectFileCard';
import Pagination from '@/components/Pagination/Pagination';
import { useRepoStore } from '@/stores/useRepoStore';
import { Repository } from '@/types/repository';
import type { TypeFilterOption } from '@/types/sortAndFilter';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RepositoryActions from './RepositoryActions';

type RepositoryListProps = {
  user: {
    image?: string | null;
    email?: string | null;
    id?: string;
    login?: string | null;
  };
  repositories: Repository[];
  searchParams: Record<string, string>;
};

const typeOptions = ['검사완료', '검사중'];
const sortOptions = ['최신순', '오래된순', '이름순'];

const perPage = 16;

export default function RepositoryList({ user, repositories, searchParams }: RepositoryListProps) {
  const router = useRouter();
  const { status } = useSession();
  const { setRepositories, filteredRepositories, setFilteredRepositories } = useRepoStore();
  const [, setTypeFilter] = useState<TypeFilterOption>();

  const userId = user?.id || '';
  const userName = user?.login || '';
  const nowPage = searchParams.page ? Number(searchParams.page) : 1;

  useEffect(() => {
    setRepositories(repositories);
    setFilteredRepositories(repositories);
  }, [repositories, setRepositories, setFilteredRepositories]);

  if (status === 'loading') {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const totalPage = Math.ceil((filteredRepositories?.length || 0) / perPage);
  const pageData = filteredRepositories.slice((nowPage - 1) * perPage, nowPage * perPage);

  const handleSortSelect = (selectedSort: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sortOption', selectedSort);
    router.push(`/repos?${newSearchParams.toString()}`);
  };

  const handleTypeSelect = (v: string) => {
    setTypeFilter(v as TypeFilterOption);
  };

  return (
    <div className="mb-[5rem] flex min-h-screen min-w-[131.4rem] flex-col gap-[2.8rem]">
      <RepositoryActions />

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
