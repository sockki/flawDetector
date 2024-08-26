import { FolderIcon, ListCheckIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';
import { ScanStatus } from './ScanStatus';

type FolderItemProps = {
  folderName: string;
  type: 'enabled' | 'analye' | 'waiting' | 'success' | 'error';
  isSelected?: boolean;
  isLast?: boolean;
};

export function FolderItem({
  folderName,
  type = 'enabled',
  isSelected = false,
  isLast = false,
}: FolderItemProps) {
  const containerStyles = twMerge(
    'flex h-[4.4rem] w-[24.7rem] justify-between gap-[1rem] border-b border-l border-r border-gray-300  p-[1rem] align-middle hover:bg-purple-light',
    isSelected ? 'bg-purple-dark' : 'bg-white',
    isLast && 'rounded-bl-[0.8rem] rounded-br-[0.8rem]',
  );
  return (
    <div className={containerStyles}>
      <div className="flex gap-[0.4rem] align-middle text-[1.6rem] text-gray-black">
        {isSelected && <ListCheckIcon />}
        <FolderIcon />
        {folderName}
      </div>
      <ScanStatus type={type} />
    </div>
  );
}
