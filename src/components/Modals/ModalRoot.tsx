import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Dimmed from '../common/Dimmed';

type ModalRootProps = {
  children: ReactNode;
  gap?: number;
};

export default function ModalRoot({ children, gap }: ModalRootProps) {
  const gapSize = gap && gap * 0.1;
  return (
    <>
      <Dimmed />
      <div
        className={twMerge(
          'absolute left-1/2 top-1/2 z-[100] flex -translate-x-1/2 -translate-y-1/2 transform flex-col bg-white p-[4.8rem]',
        )}
        style={{ gap: `${gapSize}rem` }}
      >
        {children}
      </div>
    </>
  );
}
