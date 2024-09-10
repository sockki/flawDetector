'use client';

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
  onBookMarkClick: (e: React.MouseEvent<HTMLDivElement>) => void;
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
      icon: '',
    },
  };

  const { icon } = stateConfig[type];

  return (
    <div className={baseStyles}>
      {!isMarked && type === 'enabled' && (
        <div onClick={onBookMarkClick}>
          <EmptyBookMarkIcon />
        </div>
      )}

      {!isMarked && type !== 'enabled' && <>{icon}</>}

      {isMarked && type === 'enabled' && (
        <div onClick={onBookMarkClick}>
          <FullBookMarkIcon />
        </div>
      )}

      {isMarked && type !== 'enabled' && (
        <>
          <div onClick={onBookMarkClick}>
            <FullBookMarkIcon />
          </div>
          {icon}
        </>
      )}
    </div>
  );
}
