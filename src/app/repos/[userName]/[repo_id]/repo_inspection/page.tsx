import { RepoSide } from '../_components/RepoSide';
import { ResultFormat } from './_components/resultFormat';

export default function RepoInspection({
  params,
}: {
  params: { userName: string; repo_id: string };
}) {
  return (
    <div className="flex gap-[2.8rem]">
      <RepoSide params={params} />
      <ResultFormat />
    </div>
  );
}
