import { RepoSide } from './_components/RepoSide';
import { ScanFormat } from './_components/ScanFormat';

export default function RepoInspection({
  params,
}: {
  params: { userName: string; repo_id: string };
}) {
  return (
    <div className="flex gap-[2.8rem]">
      <RepoSide params={params} />
      <ScanFormat />;
    </div>
  );
}
