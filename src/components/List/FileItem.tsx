'use client';

import { useCallback, useState } from 'react';
import { ListDocumentIcon, ListCheckIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { ListStatusType } from '@/types/list';
import { ScanStatus } from './ScanStatus';

type FileItemProps = {
  fileName: string;
  type: ListStatusType;
  isSelected?: boolean;
  isMarked?: boolean;
  onFileClick: () => void;
};

export function FileItem({
  fileName,
  type = 'enabled',
  isSelected = false,
  isMarked: initialIsMarked = false,
  onFileClick,
}: FileItemProps) {
  const containerStyles = twMerge(
    'group flex h-[5.2rem] w-[24.7rem] flex-col justify-center gap-[0.4rem] border-b border-gray-300 p-[1rem] align-middle hover:bg-purple-light',
    isSelected ? 'bg-purple-50' : 'bg-white',
  );

  const itemStyles = 'flex h-fit w-full justify-between items-center';

  const infoStyles = 'flex gap-[0.7rem] items-center text-[1.6rem] text-gray-black';

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
    <div className={containerStyles} onClick={onFileClick}>
      <div className={itemStyles}>
        <div className={infoStyles}>
          {isSelected && <ListCheckIcon />}
          <ListDocumentIcon />
          {fileName}
        </div>
        <ScanStatus type={type} onBookMarkClick={handleBookmark} isMarked={isMarked} />
      </div>
      {type !== 'enabled' && <ProgressBar type={type} />}
    </div>
  );
}
