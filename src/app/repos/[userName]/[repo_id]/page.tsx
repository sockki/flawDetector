import { RepoSide } from './_components/RepoSide';
import { ScanFormat } from './_components/ScanFormat';
import { Title } from './_components/Title';

export default function CodeList() {
  return (
    <div className="relative left-[8rem] flex h-[147.1rem] w-[176.05rem] flex-col gap-[2.0rem]">
      <Title repoName="spface-1" />
      <div className="flex gap-[2.8rem]">
        <RepoSide />
        <ScanFormat />
      </div>
    </div>
  );
}
