'use client';

import { useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { ChatBot } from '../ChatBot/ChatBot';

type FloatingButtonProps = {
  type: 'top' | 'ask';
};

export function FloatingButton({ type }: FloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (type === 'top') {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (type === 'ask') {
      setIsOpen(prev => !prev);
    }
  };

  const icons = {
    top: {
      src: '/icons/floatVector.svg',
      width: 32,
      height: 32,
      rightClass: 'right-[1rem]',
      label: 'TOP',
    },
    ask: {
      src: '/icons/floatChat.svg',
      width: 35,
      height: 35,
      rightClass: 'right-[10rem]',
      label: '',
    },
  };

  const icon = icons[type];

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={twMerge(
          'group fixed bottom-4 flex h-[7.6rem] w-[7.6rem] items-center justify-center rounded-full shadow-lg focus:outline-none',
          icon.rightClass,
          'bg-white text-primary-500 hover:bg-primary-500 hover:text-white',
        )}
      >
        <div className="flex flex-col items-center justify-center">
          <Image
            src={icon.src}
            alt={type === 'ask' ? 'Chat Icon' : 'Top Icon'}
            width={icon.width}
            height={icon.height}
            className="group-hover:`brightness-0·group-hover:invert·group-hover:filter·brightness-0"
          />
          {icon.label && <span className="text-[1.5rem] font-bold">{icon.label}</span>}
        </div>
      </button>

      {type === 'ask' && isOpen && (
        <div className="fixed·inset-0·flex·items-center·justify-center·bg-black·bg-opacity-5">
          <div className="flex h-[60rem] w-[40rem] flex-col rounded-lg bg-white p-[0.25rem] shadow-lg">
            <ChatBot />
          </div>
        </div>
      )}
    </>
  );
}
