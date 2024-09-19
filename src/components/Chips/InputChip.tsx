'use client';

import { DocumentIcon, RemoveIcon } from '@/public/index';
import { MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';

type ChipProps = {
  label: string;
  leftIcon?: boolean;
  percentage?: number;
  isRemovable?: boolean;
  className?: string;
  onRemove?: () => void;
};

export default function InputChip({
  label,
  leftIcon,
  percentage,
  isRemovable,
  className,
  onRemove,
}: ChipProps) {
  const handleRemoveClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };
  const maxWidth = leftIcon && !percentage && !isRemovable ? 'max-w-[14.8rem]' : 'max-w-[22.1rem]';

  return (
    <div
      role="button"
      tabIndex={0}
      className={twMerge(
        `flex w-full ${maxWidth} items-center justify-between rounded-[0.8rem] px-[1.2rem] py-[0.8rem] text-[1.6rem] text-gray-black selection:border selection:border-gray-middle selection:bg-purple-dark selection:shadow-button hover:bg-purple-light focus:bg-purple-dark focus:outline-none`,
        className,
      )}
    >
      {leftIcon && <DocumentIcon />}
      <span>{label}</span>
      {percentage && <span className="font-medium">{percentage}%</span>}
      {isRemovable && (
        <button type="button" onClick={handleRemoveClick}>
          <RemoveIcon />
        </button>
      )}
    </div>
  );
}
