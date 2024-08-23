import { ScanEntireFolder } from './_components/ScanEntireFolder';
import { ScanFormat } from './_components/ScanFormat';
import { ScanProgress } from './_components/ScanProgress';
import { ScanStatus } from './_components/ScanStatus';

export default function CodeList() {
  return (
    <div>
      <div className="mb-[2rem] mt-[2rem] flex items-center gap-[2.8rem]">
        <ScanEntireFolder />
        <ScanProgress />
      </div>
      <div className="flex gap-[2.8rem]">
        <ScanStatus detectedCount={14} errorCount={8} successCount={23} />
        <ScanFormat />
      </div>
    </div>
  );
}
