import * as ProgressPrimitive from '@radix-ui/react-progress';
import { ComponentProps } from 'react';

type ProgressBarProps = ComponentProps<typeof ProgressPrimitive.Root> & {
  progress?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
};

export function ProgressBar({ progress = 0, ...rest }: ProgressBarProps) {
  const rootStyles = 'relative h-[1.2rem] w-[144.4rem] overflow-hidden rounded-full bg-neutral-10';

  const indicatorStyles =
    'h-full w-full rounded-full bg-system-success transition-transform duration-300';

  return (
    <ProgressPrimitive.Root value={progress} max={100} className={rootStyles} {...rest}>
      <ProgressPrimitive.Indicator
        className={indicatorStyles}
        style={{ transform: `translateX(${progress - 100}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
