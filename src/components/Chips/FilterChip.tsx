'use client';

import { CaretIcon, CloseIcon, SelectedIcon } from '@/public/index';
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

  const handleClickClose = () => {
    setIsOpen(false);
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
          <li className="flex cursor-pointer justify-between overflow-hidden text-nowrap px-[0.95rem] py-[1rem]">
            <span className="">select {label}</span>
            <button type="button" onClick={handleClickClose}>
              <CloseIcon />
            </button>
          </li>
          {options.map(option => (
            <li
              key={option}
              className={twMerge(
                'flex cursor-pointer gap-[2rem] overflow-hidden text-nowrap px-[0.95rem] py-[1rem] hover:bg-purple-light',
                selectedOption === option && 'bg-purple-50',
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
