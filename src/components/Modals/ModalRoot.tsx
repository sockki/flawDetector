import { useOutsideClick } from '@/hooks/useOutsideClick';
import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import Dimmed from '../common/Dimmed';

type ModalRootProps = {
  children: ReactNode;
  gap?: 24 | 32 | 40;
  padding?: 32 | 40 | 48;
  hasShadow?: boolean;
  hasDimmed?: boolean;
  setIsModalOpen: () => void;
  isOpen: boolean;
};

function ModalPortal({ children }: PropsWithChildren) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);

  if (!portalElement) {
    return null;
  }

  return createPortal(<>{children}</>, portalElement);
}

export default function ModalRoot({
  children,
  gap,
  hasDimmed,
  hasShadow,
  padding = 48,
  setIsModalOpen,
  isOpen,
}: ModalRootProps) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, setIsModalOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute('style', 'overflow: hidden');
    }

    return () => document.body.setAttribute('style', 'overflow: auto');
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const modalRootStyles = {
    gapSize: {
      24: 'gap-[2.4rem]',
      32: 'gap-[3.2rem]',
      40: 'gap-[4.0rem]',
    },
    paddingSize: {
      32: 'p-[3.2rem]',
      40: 'px-[6rem] py-[4rem]',
      48: 'p-[4.8rem]',
    },
  };
  return (
    <ModalPortal>
      {hasDimmed && <Dimmed />}
      <div
        ref={ref}
        className={twMerge(
          'fixed left-1/2 top-1/2 z-[100] flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded-[2rem] bg-white p-[4.8rem]',
          gap && modalRootStyles.gapSize[gap],
          modalRootStyles.paddingSize[padding],
          hasShadow && 'shadow-drop',
        )}
      >
        {children}
      </div>
    </ModalPortal>
  );
}
