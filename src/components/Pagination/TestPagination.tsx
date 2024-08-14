'use client';

import Pagination from '@/components/Pagination/Pagination';
import { useState } from 'react';

export default function TestPagination({ params }: { params: { id: string } }) {
  const [nowPage, setNowPage] = useState<number>(Number(params.id));
  return <Pagination nowPage={nowPage} setNowPage={setNowPage} name="min" totalPage={20} />;
}
// pagination 사용 예시 파일
