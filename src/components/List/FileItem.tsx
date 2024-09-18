'use client';

import { useCallback, useState } from 'react';
import { ListDocumentIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';
import { ListStatusType } from '@/types/list';
import { ScanStatus } from './ScanStatus';
import { CheckBox } from './Checkbox';

type FileItemProps = {
  fileName: string;
  type: ListStatusType;
  isSelected?: boolean;
  isMarked?: boolean;
  onFileClick: () => void;
  onCheckClick: () => void;
};

export function FileItem({
  fileName,
  type = 'enabled',
  isSelected = false,
  isMarked: initialIsMarked = false,
  onFileClick,
  onCheckClick,
}: FileItemProps) {
  const containerStyles = twMerge(
    'group flex h-[5.2rem] w-[24.7rem] flex-col justify-center gap-[0.4rem] border-t border-gray-300 p-[1rem] align-middle hover:bg-purple-light cursor-pointer',
    isSelected ? 'bg-purple-50' : 'bg-white',
  );

  const itemStyles = 'flex h-fit w-full justify-between items-center';

  const infoStyles = 'flex gap-[0.7rem] items-center text-[1.6rem] text-gray-black';

  const [isMarked, setIsMarked] = useState(initialIsMarked);
  const [isChecked, setIsChecked] = useState(false);

  const handleBookmark = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsMarked(prevIsMarked => !prevIsMarked);
      // API 호출 코드 추가 예정
    },
    [], // 의존성 배열
  );

  const handleCheckClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsChecked(prevIsMarked => !prevIsMarked);
      onCheckClick();
    },
    [], // 의존성 배열
  );

  return (
    <div className={containerStyles} onClick={onFileClick}>
      <div className={itemStyles}>
        <div className={infoStyles}>
          <CheckBox onCheckedChange={handleCheckClick} checked={isChecked} />
          <ListDocumentIcon />
          <div className="max-w-[12rem] truncate">{fileName}</div>
        </div>
        <ScanStatus type={type} onBookMarkClick={handleBookmark} isMarked={isMarked} />
      </div>
    </div>
  );
}
