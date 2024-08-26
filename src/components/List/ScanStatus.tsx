import { AnalyzeIcon, SuccessIcon, ErrorIcon, BookMarkIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';

type ScanStatusType = 'enabled' | 'analye' | 'waiting' | 'success' | 'error' | 'bookmark';

type StateConfig = {
  [key in Exclude<ScanStatusType, 'enabled'>]: {
    icon: JSX.Element | null;
    text: string;
    additionalClasses?: string;
  };
};

const stateConfig: StateConfig = {
  analye: { icon: <AnalyzeIcon />, text: '분석중' },
  waiting: { icon: null, text: '대기중..', additionalClasses: 'text-neutral-40' },
  success: { icon: <SuccessIcon />, text: '완료' },
  error: { icon: <ErrorIcon />, text: '오류' },
  bookmark: { icon: <BookMarkIcon />, text: '' },
};

type ScanStatusProps = {
  type: ScanStatusType;
};

export function ScanStatus({ type }: ScanStatusProps) {
  const baseStyles = 'flex h-fit w-fit items-center gap-[0.4rem] text-[1.6rem] text-gray-black';

  const {
    icon = null,
    text = '',
    additionalClasses = '',
  } = stateConfig[type as Exclude<ScanStatusType, 'enabled'>] || {};

  return (
    <div className={twMerge(baseStyles, additionalClasses)}>
      {icon} {text}
    </div>
  );
}
