import {
  AnalyzeIcon,
  SuccessIcon,
  ErrorIcon,
  EmptyBookMarkIcon,
  FullBookMarkIcon,
} from '@/public/index';

type ScanStatusType = 'enabled' | 'analye' | 'waiting' | 'success' | 'error';

type StateConfig = {
  [key in ScanStatusType]: {
    icon: JSX.Element | null | string;
  };
};

type ScanStatusProps = {
  type: ScanStatusType;
  isMarked?: boolean;
  onBookMarkClick: () => void;
};

export function ScanStatus({ type, isMarked, onBookMarkClick }: ScanStatusProps) {
  const baseStyles =
    'flex h-fit w-fit items-center gap-[0.4rem] text-[1.6rem] text-gray-black text-neutral-40';

  const stateConfig: StateConfig = {
    analye: { icon: <AnalyzeIcon /> },
    waiting: { icon: '대기중..' },
    success: { icon: <SuccessIcon /> },
    error: { icon: <ErrorIcon /> },
    enabled: {
      icon: isMarked ? <FullBookMarkIcon /> : <EmptyBookMarkIcon />,
    },
  };

  const { icon } = stateConfig[type];

  return (
    <div className={baseStyles} onClick={onBookMarkClick}>
      {icon}
    </div>
  );
}
