import { ResultFormat } from './_components/resultFormat';

interface RepoInspectionProps {
  params: { userName: string; repo_id: string };
}

export default function RepoInspection({ params }: RepoInspectionProps) {
  return <ResultFormat params={params} />;
}
