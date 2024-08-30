'use client';

import { useState } from 'react';
import DetectFileCard from '@/components/Card/DetectFileCard';
import FilterChip from '@/components/Chips/FilterChip';
import Pagination from '@/components/Pagination/Pagination';

type LibraryListProps = {
  nowPage: number;
  totalPage: number;
  repoData: { id: string; title: string; caption: string }[];
};

const typeOptions = ['검사완료', '검사중'];
const sortOptions = ['최신순', '오래된순', '이름순'];

export default function RepositoryList({ nowPage, totalPage, repoData }: LibraryListProps) {
  const [, setSelectedType] = useState<string>('');
  const [, setSelectedSort] = useState<string>('');

  const handleTypeSelect = (value: string) => {
    setSelectedType(value);
  };

  const handleSortSelect = (value: string) => {
    setSelectedSort(value);
  };

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
        {repoData.map(repo => (
          <DetectFileCard
            key={repo.id}
            title={repo.title}
            caption={repo.caption || ''}
            isDetected={false}
          />
        ))}
      </div>
      <div className="mx-auto">
        <Pagination nowPage={nowPage} totalPage={totalPage} />
      </div>
    </section>
  );
}
