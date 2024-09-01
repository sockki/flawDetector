import * as ProgressPrimitive from '@radix-ui/react-progress';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type ProgressBarProps = ComponentProps<typeof ProgressPrimitive.Root> & {
  type: 'enabled' | 'analye' | 'waiting' | 'success' | 'error';
  progress?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
  isError?: boolean;
};

export function ProgressBar({ progress = 0, type, ...rest }: ProgressBarProps) {
  const rootStyles = twMerge(
    'relative overflow-hidden rounded-full bg-neutral-10 h-[0.4rem] w-[22.6rem]',
  );

  const indicatorStyles = twMerge(
    'h-full w-full rounded-full transition-transform duration-300',
    type === 'error' ? 'bg-[#FFCECE]' : 'bg-[#17E0D4]',
  );

  return (
    <ProgressPrimitive.Root value={progress} max={100} className={rootStyles} {...rest}>
      <ProgressPrimitive.Indicator
        className={indicatorStyles}
        style={{
          transform: `translateX(${type === 'error' || type === 'success' ? 0 : progress - 100}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}
