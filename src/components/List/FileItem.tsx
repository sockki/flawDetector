import { ListDocumentIcon, ListCheckIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';
import { ScanStatus } from './ScanStatus';

type FileItemProps = {
  fileName: string;
  type: 'enabled' | 'analye' | 'waiting' | 'success' | 'error' | 'bookmark';
  isSelected?: boolean;
  isLast?: boolean;
};

export function FileItem({
  fileName,
  type = 'enabled',
  isSelected = false,
  isLast = false,
}: FileItemProps) {
  const containerStyles = twMerge(
    'flex h-[4.4rem] w-[24.7rem] justify-between border-l border-r gap-[1rem] border-b border-gray-300  p-[1rem] align-middle hover:bg-purple-light',
    isSelected ? 'bg-purple-dark' : 'bg-[#ffffff]',
    isLast && 'rounded-bl-[0.8rem] rounded-br-[0.8rem]',
  );
  return (
    <div className={containerStyles}>
      <div className="flex gap-[0.4rem] align-middle text-[1.6rem] text-gray-black">
        {isSelected && <ListCheckIcon />}
        <ListDocumentIcon />
        {fileName}
      </div>
      <ScanStatus type={type} />
    </div>
  );
}
