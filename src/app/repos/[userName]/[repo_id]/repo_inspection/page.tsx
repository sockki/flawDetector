import { RepoSide } from '../_components/RepoSide';
import { ResultFormat } from './_components/resultFormat';

export default function RepositoryContents(params: { userName: string; repo_id: string }) {
  return (
    <div>
      <RepoSide params={params} />
      <ResultFormat />
    </div>
  );
}
