import { ResultFormat } from './_components/resultFormat';

interface RepoInspectionProps {
  params: { userName: string; repoName: string };
}

export default function RepoInspection({ params }: RepoInspectionProps) {
  return <ResultFormat params={params} />;
}
