'use client';

import { useState } from 'react';
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
    icon: JSX.Element | null;
    text: string;
    additionalClasses?: string;
  };
};

type ScanStatusProps = {
  type: ScanStatusType;
  onBookmarkClick: () => void;
  isMarked?: boolean;
};

export function ScanStatus({ type, onBookmarkClick, isMarked: initialIsMarked }: ScanStatusProps) {
  const [isMarked, setIsMarked] = useState(initialIsMarked);

  const baseStyles = 'flex h-fit w-fit items-center gap-[0.4rem] text-[1.6rem] text-gray-black';

  const stateConfig: StateConfig = {
    analye: { icon: <AnalyzeIcon />, text: '분석중' },
    waiting: { icon: null, text: '대기중..', additionalClasses: 'text-neutral-40' },
    success: { icon: <SuccessIcon />, text: '완료' },
    error: { icon: <ErrorIcon />, text: '오류' },
    enabled: {
      icon: isMarked ? <FullBookMarkIcon /> : <EmptyBookMarkIcon />,
      text: '',
      additionalClasses: twMerge(isMarked ? 'block' : 'hidden group-hover:block'),
    },
  };

  const { icon, text, additionalClasses } = stateConfig[type];

  const handleClick = () => {
    if (type === 'enabled') {
      onBookmarkClick();
      setIsMarked(prevIsMarked => !prevIsMarked);
    }
  };

  return (
    <div className={twMerge(baseStyles, additionalClasses)} onClick={handleClick}>
      {icon} {text}
    </div>
  );
}
