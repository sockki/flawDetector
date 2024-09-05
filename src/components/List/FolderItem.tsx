'use client';

import { useState } from 'react';
import { FolderIcon, ListCheckIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
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
    'group flex h-[5.2rem] w-[24.7rem] flex-col justify-center gap-[0.4rem] border-b border-gray-300 p-[1rem] align-middle hover:bg-purple-light',
    isSelected ? 'bg-purple-dark' : 'bg-white',
  );

  const itemStyles = 'flex h-fit w-full justify-between items-center';

  const infoStyles = 'flex gap-[0.4rem] items-center text-[1.6rem] text-gray-black';

  const [isMarked, setIsMarked] = useState(initialIsMarked);

  function handleBookmark(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsMarked(prevIsMarked => !prevIsMarked);
    // api 생성후 들어갈 예정입니다.
  }

  return (
    <div className={containerStyles} onClick={onFolderClick}>
      <div className={itemStyles}>
        <div className={infoStyles}>
          {isSelected && <ListCheckIcon />}
          <FolderIcon />
          {folderName}
        </div>
        <ScanStatus type={type} onBookMarkClick={() => handleBookmark} isMarked={isMarked} />
      </div>
      {type === 'enabled' ? '' : <ProgressBar type={type} />}
    </div>
  );
}
