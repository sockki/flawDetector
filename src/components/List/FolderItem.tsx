'use client';

import { useCallback, useState } from 'react';
import { FolderIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';
import { ListStatusType } from '@/types/list';
import { ScanStatus } from './ScanStatus';

type FolderItemProps = {
  folderName: string;
  type: ListStatusType;
  isSelected?: boolean;
  isMarked?: boolean;
  onFolderClick: () => void;
};

export function FolderItem({
  folderName,
  type = 'enabled',
  isSelected = false,
  isMarked: initialIsMarked = false,
  onFolderClick,
}: FolderItemProps) {
  const containerStyles = twMerge(
    'group flex h-[5.2rem] w-[24.7rem] flex-col justify-center gap-[0.4rem] border-t border-gray-300 p-[1rem] align-middle hover:bg-purple-light cursor-pointer',
    isSelected ? 'bg-purple-dark' : 'bg-white',
  );

  const itemStyles = 'flex h-fit w-full justify-between items-center';

  const infoStyles = 'flex gap-[0.4rem] items-center text-[1.6rem] text-gray-black';

  const [isMarked, setIsMarked] = useState(initialIsMarked);

  const handleBookmark = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsMarked(prevIsMarked => !prevIsMarked);
      // API 호출 코드 추가 예정
    },
    [], // 의존성 배열
  );

  return (
    <div className={containerStyles} onClick={onFolderClick}>
      <div className={itemStyles}>
        <div className={infoStyles}>
          <FolderIcon />
          <div className="max-w-[12rem] truncate">{folderName}</div>
        </div>
        <ScanStatus type={type} onBookMarkClick={handleBookmark} isMarked={isMarked} />
      </div>
    </div>
  );
}
