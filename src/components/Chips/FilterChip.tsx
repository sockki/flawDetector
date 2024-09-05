'use client';

import { CaretIcon, SelectedIcon } from '@/public/index';
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

  const toggleDropdown = () => setIsOpen(() => !isOpen);
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className={twMerge('w-fit text-[2rem] font-regular text-[#3f3f3f] hover:bg-purple-light')}>
      <div
        className="relative flex cursor-pointer items-center justify-between rounded-[0.8rem] border border-[#c3c3c3] p-[1rem]"
        onClick={toggleDropdown}
      >
        <span className="flex-1">{label}</span>
        {hasIcon && (
          <CaretIcon
            className={`ml-[0.4rem] transition-transform ${isOpen ? 'rotate-180 transform' : ''}`}
          />
        )}
      </div>
      {isOpen && (
        <ul className="absolute left-0 mt-2 overflow-hidden rounded-[0.8rem] border border-[#c3c3c3] bg-white px-[0] shadow-drop">
          {options.map(option => (
            <li
              key={option}
              className={twMerge(
                'flex cursor-pointer gap-[0.8rem] overflow-hidden text-nowrap px-[0.95rem] py-[1rem] text-gray-dark hover:bg-purple-light',
                selectedOption === option && 'bg-purple-50 text-gray-black',
              )}
              onClick={() => handleOptionClick(option)}
            >
              {selectedOption === option && <SelectedIcon />}
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
