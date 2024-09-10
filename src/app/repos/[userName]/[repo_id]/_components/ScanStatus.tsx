import { ScanCrossIcon, ScanErrorIcon, ScanSuccessIcon } from '@/public/index';

type ScanStatusProps = {
  detectedCount: number;
  errorCount: number;
  successCount: number;
};

export function ScanStatus({ detectedCount, errorCount, successCount }: ScanStatusProps) {
  const containerStyles =
    'flex flex-col h-[11.6rem] w-[24.7rem] justify-center gap-[1.6rem] pl-[0.8rem] pr-[0.8rem]';
  const contentStyles = 'flex justify-between gap-[1rem] text-[2rem] font-medium';
  return (
    <div className={containerStyles}>
      <div className={contentStyles}>
        <div className="flex items-center gap-[1rem]">
          <ScanCrossIcon /> 검출된 취약점
        </div>
        {detectedCount}
      </div>
      <div className={contentStyles}>
        <div className="flex items-center gap-[1rem]">
          <ScanErrorIcon /> 수정 제안
        </div>
        {errorCount}
      </div>
      <div className={contentStyles}>
        <div className="flex items-center gap-[1rem]">
          <ScanSuccessIcon /> 문제 없음
        </div>
        {successCount}
      </div>
    </div>
  );
}
