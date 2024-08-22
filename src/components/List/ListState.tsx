import { AnalyzeIcon, SucessIcon, ErrorIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';

type ListStateType = 'enabled' | 'analye' | 'waiting' | 'success' | 'error';

type StateConfig = {
  [key in Exclude<ListStateType, 'enabled'>]: {
    icon: JSX.Element | null;
    text: string;
    additionalClasses?: string;
  };
};

const stateConfig: StateConfig = {
  analye: { icon: <AnalyzeIcon />, text: '분석중' },
  waiting: { icon: null, text: '대기중..', additionalClasses: 'text-neutral-40' },
  success: { icon: <SucessIcon />, text: '완료' },
  error: { icon: <ErrorIcon />, text: '오류' },
};

type ListStateProps = {
  type: ListStateType;
};

export function ListState({ type }: ListStateProps) {
  const baseStyles = 'flex h-fit w-fit items-center gap-[0.4rem] text-[1.6rem] text-[#3f3f3f]';

  const {
    icon = null,
    text = '',
    additionalClasses = '',
  } = stateConfig[type as Exclude<ListStateType, 'enabled'>] || {};

  return (
    <div className={twMerge(baseStyles, additionalClasses)}>
      {icon} {text}
    </div>
  );
}
