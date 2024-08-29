'use client';

import { BugIcon, ChatIcon, SendIcon } from '@/public/index';
import { format } from 'date-fns/format';
import { ko } from 'date-fns/locale';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

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

  const messages = [
    {
      sender: 'user',
      content: '번역이 좀 잘못된 것 같아요. 이해하기 어려워요.',
      sentAt: '2024-08-30T09:15:00Z',
    },
    {
      sender: 'bot',
      content: '죄송합니다. 어떤 부분이 이해하기 어려우셨나요?',
      sentAt: '2024-08-30T09:16:00Z',
    },
    {
      sender: 'user',
      content: '이 문장의 의미가 불명확해요.',
      sentAt: '2024-08-30T09:17:00Z',
    },
    {
      sender: 'bot',
      content: '알겠습니다. 해당 문장을 다시 확인해보겠습니다.',
      sentAt: '2024-08-30T09:18:00Z',
    },
  ];

  return (
    <div className="flex h-[72.6rem] w-[55.8rem] flex-col justify-between overflow-hidden rounded-[2.4rem] bg-white shadow-chatbot">
      <div className="flex items-center gap-[1rem] bg-primary-500 px-[2.4rem] py-[1.25rem]">
        <ChatIcon />
        <h2 className="text-[2.4rem] font-bold text-white">플로디텍터 운영자</h2>
      </div>
      <div className="flex flex-1 flex-col gap-[2.4rem] overflow-hidden overflow-y-scroll px-[2rem] pt-[2rem] text-[1.6rem]">
        {/* 하나는 기본 세팅 나머지는 map */}
        <article>
          <h4 className="sr-only">bot의 말</h4>
          <div className="flex w-full gap-[0.8rem]">
            <div className="flex h-[6.2rem] w-[6.2rem] items-center justify-center rounded-[1.8rem] bg-primary-500">
              <BugIcon width={42} height={42} stroke="white" />
            </div>
            <div className="flex items-end justify-center gap-[0.4rem]">
              <div className="flex flex-col">
                <div className="text-[2rem]">플로디텍터 운영자</div>
                {/* 기본말풍선 */}
                <div className="max-w-[21.5rem] rounded-[2rem] rounded-tl-none bg-[#f7f7f7] px-[1.2rem] py-[0.8rem]">
                  <p className="break-words text-[#575757]">
                    <b>[취약성 경고] Microsoft의 여러 보안 취약점에 대한 CNNVD</b>의 보고서에서
                    모르는게 생겼나요? <br /> <br />
                    보고서에서 궁금한 점을 물어봐주세요!
                  </p>
                </div>
              </div>
              <span className="text-[1.4rem] font-regular text-[#8B8F93]">오전 11:35</span>
            </div>
          </div>
        </article>
        {/* 나머지 map */}
        {messages.map(({ sender, content, sentAt }) => (
          <article key={`${sender} ${sentAt}`}>
            <h4 className="sr-only">{sender}의 말</h4>
            <div
              className={twMerge('flex w-full gap-[0.8rem]', sender === 'user' && 'justify-end')}
            >
              {sender === 'bot' && (
                <div className="flex h-[6.2rem] w-[6.2rem] items-center justify-center rounded-[1.8rem] bg-primary-500">
                  <BugIcon width={42} height={42} stroke="white" />
                </div>
              )}

              <div
                className={twMerge(
                  'flex items-end justify-center gap-[0.4rem]',
                  sender === 'user' && 'flex-row-reverse',
                )}
              >
                <div className="flex flex-col gap-[0.2rem]">
                  {sender === 'bot' && <div className="text-[2rem]">플로디텍터 운영자</div>}
                  {/* 기본말풍선 */}
                  <div
                    className={twMerge(
                      'max-w-[30rem] rounded-[2rem] rounded-tl-none bg-[#f7f7f7] px-[1.2rem] py-[0.8rem] text-[#575757]',
                      sender === 'user' &&
                        'rounded-tl-[2rem] rounded-tr-none bg-primary-500 text-white',
                    )}
                  >
                    <p className="break-words">{content}</p>
                  </div>
                </div>
                <span className="text-[1.4rem] font-regular text-[#8B8F93]">
                  {format(new Date(sentAt), 'aaa h:mm', { locale: ko })}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="p-[2rem]">
        <div className="flex items-end justify-center gap-[1rem] rounded-[2.4rem] bg-[#F8F8F9] px-[1.6rem] py-[1.2rem]">
          <div className="flex min-w-0 flex-1 flex-col">
            <textarea
              ref={textareaRef}
              className="m-0 max-h-[8rem] resize-none border-0 bg-transparent px-0 py-[0.8rem] text-[2rem] leading-none text-gray-black placeholder:text-[#B3B6BA] focus:outline-none focus:ring-0 focus-visible:ring-0"
              value={inputText}
              onChange={handleOnChange}
              placeholder="챗봇에게 궁금한 점을 물어보세요!"
              rows={1}
              style={{ overflowY: 'hidden' }}
            />
          </div>
          <button
            type="button"
            aria-label="Send prompt"
            className="flex h-[3.64rem] w-[4.6rem] items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-300 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
