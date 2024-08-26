'use client';

import { ChatIcon, SendIcon } from '@/public/index';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function Chatbot() {
  // const [message, setMessage] = useState([]);
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // const messageStyles = {
  //   user: '',
  //   bot: '',
  // };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight * 0.1}rem`;
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    autoResizeTextarea();
  };

  // 컴포넌트가 마운트될 때 한 번 실행하여 textarea의 초기 크기를 맞춤
  useEffect(() => {
    autoResizeTextarea();
  }, []);

  return (
    <div className="shadow-chatbot flex h-[72.6rem] w-[55.8rem] flex-col justify-between overflow-hidden rounded-[3.6rem] bg-white">
      <div className="flex items-center gap-[1rem] bg-primary-500 p-[2.4rem]">
        <ChatIcon />
        <h2 className="text-[2.4rem] text-white">플로디텍터 운영자</h2>
      </div>
      <div>메세지 영역</div>
      <div className="p-[2rem]">
        <div className="flex items-end justify-center gap-[1rem] rounded-[2.4rem] bg-[#F8F8F9] px-[1.6rem] py-[1.2rem]">
          <div className="flex min-w-0 flex-1 flex-col">
            <textarea
              ref={textareaRef}
              className="m-0 max-h-[8rem] resize-none border-0 bg-transparent px-0 py-[0.8rem] text-[2rem] leading-none placeholder:text-[#B3B6BA] focus:outline-none focus:ring-0 focus-visible:ring-0"
              value={inputText}
              onChange={handleOnChange}
              placeholder="챗봇에게 궁금한 점을 물어보세요!"
              rows={1}
              style={{ overflowY: 'hidden' }} // 스크롤바를 숨김
            />
          </div>
          <button
            type="button"
            aria-label="Send prompt"
            className="flex h-[3.64rem] w-[4.6rem] items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
