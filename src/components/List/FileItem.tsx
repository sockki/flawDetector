import { ListDocumentIcon, ListCheckIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';
import { ScanStatus } from './ScanStatus';
import { ProgressBar } from '../ProgressBar/ProgressBar';

type FileItemProps = {
  fileName: string;
  type: 'enabled' | 'analye' | 'waiting' | 'success' | 'error';
  isSelected?: boolean;
  isLast?: boolean;
  isMarked?: boolean;
  handleBookmarkClick: () => void;
};

export function FileItem({
  fileName,
  type = 'enabled',
  isSelected = false,
  isLast = false,
  isMarked = false,
  handleBookmarkClick,
}: FileItemProps) {
  const containerStyles = twMerge(
    'group flex h-[5.2rem] w-[24.7rem] flex-col justify-center gap-[0.4rem] border-b border-l border-r border-gray-300 p-[1rem] align-middle hover:bg-purple-light',
    isSelected ? 'bg-purple-dark' : 'bg-[#ffffff]',
    isLast && 'rounded-bl-[0.8rem] rounded-br-[0.8rem]',
  );

  const itemStyles = 'flex h-fit w-full justify-between align-middle';

  const infoStyles = 'flex gap-[0.4rem] align-middle text-[1.6rem] text-gray-black';

  return (
    <div className={containerStyles}>
      <div className={itemStyles}>
        <div className={infoStyles}>
          {isSelected && <ListCheckIcon />}
          <ListDocumentIcon />
          {fileName}
        </div>
        <ScanStatus type={type} onBookmarkClick={handleBookmarkClick} isMarked={isMarked} />
      </div>
      {type === 'enabled' ? '' : <ProgressBar isList />}
    </div>
  );
}
