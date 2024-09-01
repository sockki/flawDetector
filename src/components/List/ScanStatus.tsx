import {
  AnalyzeIcon,
  SuccessIcon,
  ErrorIcon,
  EmptyBookMarkIcon,
  FullBookMarkIcon,
} from '@/public/index';
import { twMerge } from 'tailwind-merge';

type ScanStatusType = 'enabled' | 'analye' | 'waiting' | 'success' | 'error';

type StateConfig = {
  [key in ScanStatusType]: {
    icon: JSX.Element | null | string;
    additionalClasses?: string;
  };
};

type ScanStatusProps = {
  type: ScanStatusType;
  isMarked?: boolean;
  onBookMarkClick: () => void;
};

export function ScanStatus({ type, isMarked, onBookMarkClick }: ScanStatusProps) {
  const baseStyles = 'flex h-fit w-fit items-center gap-[0.4rem] text-[1.6rem] text-gray-black';

  const stateConfig: StateConfig = {
    analye: { icon: <AnalyzeIcon /> },
    waiting: { icon: '대기중..', additionalClasses: 'text-neutral-40' },
    success: { icon: <SuccessIcon /> },
    error: { icon: <ErrorIcon /> },
    enabled: {
      icon: isMarked ? <FullBookMarkIcon /> : <EmptyBookMarkIcon />,
      additionalClasses: twMerge(isMarked ? 'block' : 'hidden group-hover:block'),
    },
  };

  const { icon, additionalClasses } = stateConfig[type];

  return (
    <div className={twMerge(baseStyles, additionalClasses)} onClick={onBookMarkClick}>
      {icon}
    </div>
  );
}
