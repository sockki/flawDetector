import {
  AnalyzeIcon,
  SuccessIcon,
  ErrorIcon,
  EmptyBookMarkIcon,
  FullBookMarkIcon,
} from '@/public/index';
import { ListStatusType } from '@/types/list';

type StateConfig = {
  [key in ListStatusType]: {
    icon: JSX.Element | null | string;
  };
};

type ScanStatusProps = {
  type: ListStatusType;
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
