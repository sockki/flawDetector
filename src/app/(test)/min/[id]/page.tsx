import Pagination from '@/components/Pagination/Pagination';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Pagination nowPage={Number(params.id)} totalPage={20} />
    </div>
  );
}
