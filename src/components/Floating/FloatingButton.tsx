'use client';

import { ChatIcon, TopIcon } from '@/public/index';

import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { Content } from '@/types/crawlingData';
import Chatbot from '../Chatbot/Chatbot';

type FloatingButtonProps = {
  type: 'top' | 'ask';
  className?: string;
  report?: Report;
};

type Report = { title: string; desc: Content[] };

const initReport: Report = {
  title: '',
  desc: [],
};

export function FloatingButton({ type, className, report }: FloatingButtonProps) {
  const [toggleAsk, setToggleAsk] = useState<boolean>(false);
  const handleClickTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleClickAsk = () => {
    setToggleAsk(prev => !prev);
  };

  const IconComponent = type === 'top' ? TopIcon : ChatIcon;

  return (
    <div className="fixed bottom-[7rem] right-[8rem] z-50 flex flex-col items-end gap-[2.4rem]">
      {toggleAsk && <Chatbot report={report || initReport} />}
      <button
        type="button"
        onClick={type === 'top' ? handleClickTop : handleClickAsk}
        className={twMerge(
          'group flex h-[7.6rem] w-[7.6rem] flex-col items-center justify-center gap-[0.8rem] rounded-full border-[0.14rem] border-primary-500 bg-white text-primary-500 hover:border-primary-500 hover:bg-primary-500 hover:text-white focus:outline-none',
          className,
        )}
      >
        <IconComponent className="fill-primary-500 group-hover:fill-white" />
        {type === 'top' && <span className="text-[1.5rem] font-bold">TOP</span>}
      </button>
    </div>
  );
}
