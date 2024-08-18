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
  const [isHovered, setIsHovered] = useState(false);

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
      default: '/icons/floatVector.svg',
      hovered: '/icons/floatVectorwhite.svg',
      width: 32,
      height: 32,
    },
    ask: {
      default: '/icons/floatChat.svg',
      hovered: '/icons/floatChatwhite.svg',
      width: 35,
      height: 35,
    },
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={twMerge(
          'fixed bottom-4 flex items-center justify-center w-[7.6rem] h-[7.6rem] rounded-full shadow-lg focus:outline-none',
          type === 'ask' ? 'right-40' : 'right-4',
          isHovered ? 'bg-primary-500 text-white' : 'bg-white text-primary-500',
        )}
      >
        {type === 'ask' ? (
          <div className="w-[4.2rem] h-[4.2rem] flex items-center justify-center">
            <Image
              src={isHovered ? icons.ask.hovered : icons.ask.default}
              alt="Chat Icon"
              width={icons.ask.width}
              height={icons.ask.height}
              layout="fixed"
              objectFit="contain"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image
              src={isHovered ? icons.top.hovered : icons.top.default}
              alt="Top Icon"
              width={icons.top.width}
              height={icons.top.height}
              layout="fixed"
              objectFit="contain"
            />
            <span className="text-[1.5rem] font-bold">TOP</span>
          </div>
        )}
      </button>

      {type === 'ask' && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[40rem] h-[60rem] rounded-lg shadow-lg flex flex-col p-4">
            <button type="button" onClick={handleClick} className="self-end mb-4 p-2">
              닫기
            </button>
            <ChatBot />
          </div>
        </div>
      )}
    </>
  );
}
