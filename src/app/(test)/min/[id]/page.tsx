import TestPagination from '@/components/Pagination/TestPagination';

export default function page({ params }: { params: { id: string } }) {
  return <TestPagination params={params} />;
}
