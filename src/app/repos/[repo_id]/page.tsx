import { ScanButton } from './_components/ScanButton';
import { ScanEntireFolder } from './_components/ScanEntireFolder';
import { ScanFormat } from './_components/ScanFormat';
import { ScanStatus } from './_components/ScanStatus';
import { Title } from './_components/Title';

export default function CodeList() {
  return (
    <div className="relative left-[8rem] flex h-[147.1rem] w-[176.05rem] flex-col gap-[4.5rem]">
      <Title repoName="spface-1" />
      <div className="flex gap-[2.8rem]">
        <div className="mb-[2rem] flex flex-col gap-[2.8rem]">
          <ScanEntireFolder />
          <ScanStatus detectedCount={14} errorCount={8} successCount={23} />
          <ScanButton />
        </div>
        <ScanFormat />
      </div>
    </div>
  );
}
