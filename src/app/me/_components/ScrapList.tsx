'use client';

import { useState } from 'react';
import FilterChip from '@/components/Chips/FilterChip';
import Pagination from '@/components/Pagination/Pagination';
import ScrapCard from '@/components/LibraryCard/ScrapCard';
import type { ScrapCardProps } from '@/types/scrapCard';

type ScrapListProps = {
  searchParams: { [key: string]: string | string[] | undefined };
  scrapData: ScrapCardProps[];
};

const typeOptions = ['취약성 보고서', '취약성 알림', '취약성 경고', '기타'];
const sortOptions = ['최신순', '오래된순', '이름순'];

export default function ScrapList({ searchParams, scrapData }: ScrapListProps) {
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
  const totalPage = Math.ceil(scrapData.length / pageItems);
  const pageData = scrapData.slice((nowPage - 1) * pageItems, nowPage * pageItems);

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
        {pageData.map(scrap => (
          <ScrapCard {...scrap} key={scrap.title} />
        ))}
      </div>
      <div className="mx-auto">
        <Pagination nowPage={nowPage} totalPage={totalPage} />
      </div>
    </section>
  );
}
