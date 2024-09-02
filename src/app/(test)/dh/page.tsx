import { getRepoItems } from '@/apis/getRepoItems';
import { useQuery } from '@tanstack/react-query';

export default function Dh() {
  const { data, error } = useQuery({
    queryKey: ['repoData', 'bang-wol', 'Algorithm-Study'],
    queryFn: () => getRepoItems({ userName: 'bang-wol', repoName: 'Algorithm-Study' }),
  });

  if (error) {
    return <div>에러가 발생하였습니다.</div>;
  }

  console.log(data);

  return (
    <div>
      <div />
    </div>
  );
}
