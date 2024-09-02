'use client';

import { getRepoItems } from '@/apis/repos/getRepoItems';
import { useQuery } from '@tanstack/react-query';

export default function Dh() {
  const { data, error } = useQuery({
    queryKey: ['repoData', 'bang-wol', 'Algorithm-Study'],
    queryFn: () => getRepoItems({ owner: 'bang-wol', repo: 'Algorithm-Study' }),
  });

  if (error) {
    return <div>에러가 발생하였습니다.</div>;
  }

  console.log(data);

  return <div />;
}
