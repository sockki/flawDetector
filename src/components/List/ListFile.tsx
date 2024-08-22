import { ListDocumentIcon, ListCheckIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';
import { ListState } from './ListState';

type ListFileProps = {
  fileName: string;
  type: 'enabled' | 'analye' | 'waiting' | 'success' | 'error';
  isSelected?: boolean;
};

export function ListFile({ fileName, type = 'enabled', isSelected = false }: ListFileProps) {
  const containerStyles = twMerge(
    'flex h-[4.4rem] w-[24.6rem] justify-between gap-[1rem] border-b border-gray-300  p-[1rem] align-middle hover:bg-purple-light',
    isSelected ? 'bg-purple-dark' : 'bg-[#ffffff]',
  );
  return (
    <div className={containerStyles}>
      <div className="flex gap-[0.4rem] align-middle text-[1.6rem] text-[#3f3f3f]">
        {isSelected && <ListCheckIcon />}
        <ListDocumentIcon />
        {fileName}
      </div>
      <ListState type={type} />
    </div>
  );
}
