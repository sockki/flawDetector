'use client';

import FilterChip from '@/components/Chips/FilterChip';
import DetectFileCard from '@/components/LibraryCard/DetectFileCard';
import Pagination from '@/components/Pagination/Pagination';
import { useRepoStore } from '@/stores/useRepoStore';
import { Repository } from '@/types/repository';
import type { TypeFilterOption } from '@/types/sortAndFilter';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EmptyState from './EmptyState';
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
  const { setRepositories, filteredRepositories, setFilteredRepositories } = useRepoStore();
  const [, setTypeFilter] = useState<TypeFilterOption>();
  const [selectedSortOption, setSelectedSortOption] = useState<string>('최신순');

  const userId = user?.id || '';
  const userName = user?.login || '';
  const nowPage = searchParams.page ? Number(searchParams.page) : 1;

  useEffect(() => {
    setRepositories(repositories);
    setFilteredRepositories(repositories);
  }, [repositories, setRepositories, setFilteredRepositories]);

  const totalPage = Math.ceil((filteredRepositories?.length || 0) / perPage);
  const pageData = filteredRepositories.slice((nowPage - 1) * perPage, nowPage * perPage);

  const handleTypeSelect = (v: string) => {
    const selectedType = v as TypeFilterOption;
    setTypeFilter(selectedType);

    let filteredRepos = [...repositories];
    if (selectedType === '검사완료') {
      filteredRepos = filteredRepos.filter(repo => repo.isChecked === 'done');
    } else if (selectedType === '검사중') {
      filteredRepos = filteredRepos.filter(repo => repo.isChecked === 'under');
    }
    setFilteredRepositories(filteredRepos);
  };

  const handleSortSelect = (selectedSort: string) => {
    setSelectedSortOption(selectedSort);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sortOption', selectedSort);
    router.push(`/repos?${newSearchParams.toString()}`);
  };

  return (
    <div className="mb-[5rem] flex min-h-screen min-w-[131.4rem] flex-col gap-[2.8rem]">
      <RepositoryActions />
      <section className="flex flex-col gap-[2.4rem]">
        <div className="flex items-center justify-between">
          <h3 className="text-[3.2rem] font-medium text-gray-black">Library</h3>
          <div className="flex gap-[1rem]">
            <FilterChip label="Type" options={typeOptions} hasIcon onSelect={handleTypeSelect} />
            <FilterChip
              label="Sort"
              options={sortOptions}
              hasIcon
              onSelect={handleSortSelect}
              selectedOption={selectedSortOption}
            />
          </div>
        </div>
        {pageData.length > 0 ? (
          <>
            <div className="grid grid-cols-4 gap-[2.4rem]">
              {pageData.map(repo => (
                <DetectFileCard
                  key={repo.id}
                  title={repo.name}
                  date={repo.pushedAt}
                  userId={userId}
                  userName={userName}
                />
              ))}
            </div>
            <div className="mx-auto">
              <Pagination nowPage={nowPage} totalPage={totalPage} />
            </div>
          </>
        ) : (
          <EmptyState
            title="레포지토리 목록이 비어있어요."
            description="레포지토리를 추가해 주세요."
          />
        )}
      </section>
    </div>
  );
}
