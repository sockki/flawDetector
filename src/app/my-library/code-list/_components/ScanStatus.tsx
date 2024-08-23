import { ScanCrossIcon, ScanErrorIcon, ScanSuccessIcon } from '@/public/index';

type ScanStatusProps = {
  detectedCount: number;
  errorCount: number;
  successCount: number;
};

export function ScanStatus({ detectedCount, errorCount, successCount }: ScanStatusProps) {
  const containerStyles =
    'flex h-[6.5rem] w-[24.6rem] justify-evenly gap-[2.4rem] rounded-[0.8rem] border-[0.1rem] border-[#c3c3c3] pl-[1rem] pr-[1rem]';
  const contentStyles = 'flex items-center gap-[1rem] text-[2rem] font-medium';
  return (
    <div className={containerStyles}>
      <div className={contentStyles}>
        <ScanCrossIcon /> {detectedCount}
      </div>
      <div className={contentStyles}>
        <ScanErrorIcon /> {errorCount}
      </div>
      <div className={contentStyles}>
        <ScanSuccessIcon /> {successCount}
      </div>
    </div>
  );
}
