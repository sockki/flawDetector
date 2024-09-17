import { SelectedIcon } from '@/public/index';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type SortType = 'folder' | 'bookmark' | 'checked' | 'unchecked'; // 사용되지 않음

type SortListProps = {
  onChangeSortType: (type: SortType) => void;
  onIsSortHandle: (boolean: boolean) => void;
};

const sortConfig = [
  { type: 'folder', label: '폴더순' },
  { type: 'bookmark', label: '북마크순' },
  { type: 'checked', label: '검사한파일순' },
  { type: 'unchecked', label: '미검사순' },
];

export default function SortList({ onChangeSortType, onIsSortHandle }: SortListProps) {
  const [isSelected, setIsSelected] = useState<SortType>('folder'); // 기본값 설정

  const handleTypeChange = (type: SortType) => {
    onIsSortHandle(false);
    setIsSelected(type);
    onChangeSortType(type);
  };

  return (
    <ul className="absolute z-[1] border bg-white">
      {sortConfig.map(item => (
        <li key={item.type}>
          <button
            type="button"
            className={twMerge(
              'flex h-[4.8rem] w-[11.5rem] items-center justify-start gap-[0.8rem] p-2 text-left text-[1.8rem] font-normal text-gray-default hover:bg-purple-50',
              isSelected === item.type ? 'bg-primary-50 text-gray-black' : '',
            )}
            onClick={() => handleTypeChange(item.type as SortType)}
          >
            {isSelected === item.type && <SelectedIcon />}
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
