import { useState } from 'react';
import Image from 'next/image';
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
        className={`fixed bottom-4 ${
          type === 'ask' ? 'right-40' : 'right-4'
        } flex items-center justify-center w-[76px] h-[76px] rounded-full shadow-lg focus:outline-none bg-white text-[#6100FF] hover:bg-[#6100FF] hover:text-white`}
      >
        {type === 'ask' ? (
          <div className="w-[42px] h-[42px] flex items-center justify-center">
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
            <span className="text-[15px] font-bold">TOP</span>
          </div>
        )}
      </button>

      {type === 'ask' && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[400px] h-[600px] rounded-lg shadow-lg flex flex-col p-4">
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
