import { ReactNode } from 'react';

type ModalTextProps = {
  children: ReactNode;
  helpText: string;
};

export default function ModalText({ children, helpText }: ModalTextProps) {
  return (
    <div>
      {children}
      <p>{helpText}</p>
    </div>
  );
}
