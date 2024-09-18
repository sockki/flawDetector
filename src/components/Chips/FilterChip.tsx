'use client';

import { CaretIcon, SelectedIcon } from '@/public/index';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type FilterChipProps = {
  label: string;
  options: string[];
  hasIcon?: boolean;
  onSelect: (option: string) => void;
  selectedOption?: string;
};

export default function FilterChip({
  label,
  options,
  hasIcon,
  onSelect,
  selectedOption,
}: FilterChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedOption, setInternalSelectedOption] = useState<string | undefined>(
    selectedOption,
  );
  const toggleDropdown = () => setIsOpen(() => !isOpen);
  const handleOptionClick = (option: string) => {
    setInternalSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="h-fit w-fit text-[2rem] text-[#3f3f3f] hover:bg-purple-light">
      <div
        className="relative flex w-fit cursor-pointer items-center justify-between rounded-[0.8rem] border border-[#c3c3c3] p-[1rem]"
        onClick={toggleDropdown}
      >
        <span>{label}</span>
        {hasIcon && (
          <CaretIcon
            className={`ml-[0.4rem] transition-transform ${isOpen ? 'rotate-180 transform' : ''}`}
          />
        )}

        {isOpen && (
          <ul className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 transform overflow-hidden rounded-[0.8rem] border border-[#c3c3c3] bg-white shadow-drop">
            {options.map(option => (
              <li
                key={option}
                className={twMerge(
                  'flex cursor-pointer justify-center gap-[0.8rem] overflow-hidden text-nowrap px-[0.95rem] py-[1rem] text-gray-dark hover:bg-purple-light',
                  internalSelectedOption === option && 'bg-purple-50 text-gray-black',
                )}
                onClick={() => handleOptionClick(option)}
              >
                {internalSelectedOption === option && <SelectedIcon />}
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
