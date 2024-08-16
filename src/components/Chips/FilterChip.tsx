'use client';

import { CaretIcon } from '@/public/index';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type FilterChipProps = {
  label: string;
  options: string[];
  hasIcon?: boolean;
  onSelect: (option: string) => void;
};

export default function FilterChip({ label, options, hasIcon, onSelect }: FilterChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>('');

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div
      className={twMerge(
        'relative inline-block text-[2rem] font-regular text-[#3f3f3f] hover:bg-purple-light',
        hasIcon ? 'w-[10rem]' : 'w-[7rem]',
      )}
    >
      <div
        className="flex cursor-pointer items-center justify-between rounded-[0.8rem] border border-[#c3c3c3] px-[0.95rem] py-1"
        onClick={toggleDropdown}
      >
        <span className="flex-1">{selectedOption || label}</span>
        {hasIcon && (
          <CaretIcon
            className={`ml-[0.4rem] transition-transform ${isOpen ? 'rotate-180 transform' : ''}`}
          />
        )}
      </div>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full overflow-hidden rounded-[0.8rem] border border-[#c3c3c3] bg-white px-[0] shadow-lg">
          {options.map(option => (
            <li
              key={option}
              className="cursor-pointer overflow-hidden text-nowrap px-[0.95rem] hover:bg-purple-light"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
