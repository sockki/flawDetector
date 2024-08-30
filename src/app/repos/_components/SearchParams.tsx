'use client';

import { useSearchParams } from 'next/navigation';

type SearchParamsProps = {
  onParamsChange: (nowPage: number) => void;
};

export default function SearchParams({ onParamsChange }: SearchParamsProps) {
  const searchParams = useSearchParams();
  const nowPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  onParamsChange(nowPage);

  return null;
}
