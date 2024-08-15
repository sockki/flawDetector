import Pagination from '@/components/Pagination/Pagination';

export default function page({ params }: { params: { id: string } }) {
  return <Pagination nowPage={Number(params.id)} name="min" totalPage={20} />;
}
