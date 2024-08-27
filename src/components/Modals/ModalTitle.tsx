import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ModalTitleProps = {
  children: ReactNode;
  size: 'sm' | 'lg';
};

export default function ModalTitle({ children, size }: ModalTitleProps) {
  const sizeStyles = {
    sm: 'text-[2rem]',
    lg: 'text-[2.4rem]',
  };
  return (
    <h1 className={twMerge('p-[1rem] text-center font-bold', sizeStyles[size])}>{children}</h1>
  );
}
