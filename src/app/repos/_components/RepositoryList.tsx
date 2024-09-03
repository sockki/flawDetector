'use client';

import { useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import DetectFileCard from '@/components/LibraryCard/DetectFileCard';
import FilterChip from '@/components/Chips/FilterChip';
import type { DetectFileCardProps } from '@/types/detectedFileCard';

type RepositoryListProps = {
  searchParams: { [key: string]: string | string[] | undefined };
  repoData: DetectFileCardProps[];
};

const typeOptions = ['검사완료', '검사중'];
const sortOptions = ['최신순', '오래된순', '이름순'];

export default function RepositoryList({ searchParams, repoData }: RepositoryListProps) {
  const [, setSelectedType] = useState<string>('');
  const [, setSelectedSort] = useState<string>('');

  const handleTypeSelect = (value: string) => {
    setSelectedType(value);
  };

  const handleSortSelect = (value: string) => {
    setSelectedSort(value);
  };
  const nowPage = searchParams.page ? Number(searchParams.page) : 1;
  const pageItems = 16;
  const totalPage = Math.ceil(repoData.length / pageItems);
  const pageData = repoData.slice((nowPage - 1) * pageItems, nowPage * pageItems);

  return (
    <section className="flex min-h-screen flex-col gap-[2.4rem]">
      <div className="flex items-center justify-between">
        <h3 className="text-[3.2rem] font-medium text-gray-black">Library</h3>
        <div className="flex gap-[1rem]">
          <FilterChip label="Type" options={typeOptions} hasIcon onSelect={handleTypeSelect} />
          <FilterChip label="Sort" options={sortOptions} hasIcon onSelect={handleSortSelect} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[2.4rem]">
        {pageData.map(repo => (
          <DetectFileCard {...repo} key={repo.title} />
        ))}
      </div>
      <div className="mx-auto">
        <Pagination nowPage={nowPage} totalPage={totalPage} />
      </div>
    </section>
  );
}
