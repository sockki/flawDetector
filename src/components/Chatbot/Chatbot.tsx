'use client';

import { BugIcon, ChatbotIcon, SendIcon } from '@/public/index';
import { format } from 'date-fns/format';
import { ko } from 'date-fns/locale';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Message = {
  sender: 'user' | 'bot';
  content: string;
  sentAt: string;
};

const report = {
  title: '[취약성 보고서] Microsoft의 다양한 보안 취약점에 대한 CNNVD의 보고서',
  desc: `
  Microsoft는 2024년 8월 13일에 총 89개의 보안 취약점에 대한 패치를 포함한 2024년 8월 보안 업데이트를 출시했습니다. 이 업데이트는 Microsoft Windows, Microsoft Azure Connected Machine Agent, Microsoft Visual Studio 및 Microsoft .NET 등을 포함한 다양한 제품과 시스템을 대상으로 합니다. CNNVD는 이들 중 7개를 매우 중요한 취약점으로, 66개를 고위험, 16개를 중간 위험 수준으로 평가했습니다.
  이번 보안 업데이트에는 새로운 취약점에 대한 패치 81개, 기존 취약점에 대한 패치 3개, Microsoft 제품에 영향을 미치는 타사 제품의 취약점에 대한 패치 5개가 포함되었습니다. 주요 취약점으로는 Microsoft Windows TCP/IP 구성 요소 숫자 오류, Microsoft Azure Stack 교차 사이트 스크립팅 취약점, Microsoft Azure 코드 문제 등이 있으며, 이러한 취약점들은 매우 심각한 위험 수준으로 평가되었습니다.
  또한 Microsoft는 타사 제품에서 발생하는 취약점에 대한 패치도 발표했습니다. GNU 커뮤니티의 grub2 보안 취약점, 개인 개발자의 심 버퍼 오류 취약점 등이 포함되어 있습니다.
  Microsoft는 이 취약점들을 해결하기 위한 패치를 공식적으로 발표했으며, 사용자들은 가능한 빨리 패치를 적용하는 것이 권장됩니다. 자세한 정보와 패치 다운로드는 Microsoft의 [보안 업데이트 가이드](https://msrc.microsoft.com/update-guide/en-us)에서 확인할 수 있습니다.`,
};

export default function Chatbot() {
  const [message, setMessage] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight * 0.1}rem`;
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const content = inputText;
      setInputText('');

      setMessage(prevMessages => [
        ...prevMessages,
        { sender: 'user', content, sentAt: new Date().toISOString() },
      ]);

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      const promptMessage = `
      보고서 제목: ${report.title}
      보고서 내용: ${report.desc}

      사용자 질문: "${content}"

      사용자가 질문을 하였습니다. 사용자가 인사(안녕,하이, 안녕하세요 등 인삿말을 하지 않았다면)질문에 대한 대답을 바로 해줘. 보고서 내용을 잘 읽어보고 이 보고서에 대해서 대답해주세요. 모든 대화는 높임말로 해주세요. 만약 질문이 인사나 일반적인 대화라면 친근하고 예의 바르게 답변해 주세요. 예를 들어, "안녕하세요?"라는 질문에는 "안녕하세요! 무엇을 도와드릴까요?"라고 응답하세요.
      만약 질문이 보고서 내용과 관련된 것이라면 정중하고 친근하게 답변해 주세요. 만약 사용자 질문이 보고서와 관련이 없다면, "죄송하지만, 저는 보고서와 관련된 질문에만 답변드릴 수 있어요. 다른 궁금한 점이 있으면 언제든지 말씀해 주세요!"라고 응답해 주세요.
    `;

      try {
        const response = await fetch('/api/generateMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: promptMessage,
          }),
        });

        if (!response.ok) {
          throw new Error('응답 생성 실패');
        }
        const data = await response.json();

        setMessage(prevMessage => [
          ...prevMessage,
          { sender: 'bot', content: data.message, sentAt: new Date().toISOString() },
        ]);
      } catch (error) {
        throw new Error('응답 생성 실패');
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (e.nativeEvent.isComposing === false) {
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [message]);

  return (
    <div className="flex h-[72.6rem] w-[55.8rem] flex-col justify-between overflow-hidden rounded-[2.4rem] bg-white shadow-chatbot">
      <div className="flex items-center gap-[1rem] bg-primary-500 px-[2.4rem] py-[1.25rem]">
        <ChatbotIcon />
        <h2 className="text-[2.4rem] font-bold text-white">플로디텍터 운영자</h2>
      </div>
      <div
        ref={messagesContainerRef}
        className="flex flex-1 flex-col gap-[2.4rem] overflow-hidden overflow-y-scroll px-[2rem] pt-[2rem] text-[1.6rem]"
      >
        <article>
          <h4 className="sr-only">bot의 말</h4>
          <div className="flex w-full gap-[0.8rem]">
            <div className="flex h-[6.2rem] w-[6.2rem] items-center justify-center rounded-[1.8rem] bg-primary-500">
              <BugIcon width={42} height={42} stroke="white" />
            </div>
            <div className="flex items-end justify-center gap-[0.4rem]">
              <div className="flex flex-col items-start gap-[0.2rem]">
                <div className="text-[2rem]">플로디텍터 운영자</div>
                <div className="max-w-[30rem] rounded-[2rem] rounded-tl-none bg-[#f7f7f7] px-[1.2rem] py-[0.8rem] text-[#575757]">
                  <b>{report.title}</b>에서 모르는게 생겼나요?
                  <br /> <br />
                  보고서에서 궁금한 점을 물어봐주세요!
                </div>
              </div>
              <span className="text-[1.4rem] font-regular text-[#8B8F93]">
                {format(new Date(), 'aaa h:mm', { locale: ko })}
              </span>
            </div>
          </div>
        </article>

        {message.map(({ sender, content, sentAt }) => (
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
              <div className="flex flex-col items-start gap-[0.2rem]">
                {sender === 'bot' && <div className="text-[2rem]">플로디텍터 운영자</div>}
                <div
                  className={twMerge(
                    'flex items-end justify-center gap-[0.4rem]',
                    sender === 'user' && 'flex-row-reverse',
                  )}
                >
                  <div
                    className={twMerge(
                      'max-w-[30rem] rounded-[2rem] rounded-tl-none bg-[#f7f7f7] px-[1.2rem] py-[0.8rem] text-[#575757]',
                      sender === 'user' &&
                        'rounded-tl-[2rem] rounded-tr-none bg-primary-500 text-white',
                    )}
                  >
                    {content}
                  </div>
                  <span className="text-[1.4rem] font-regular text-[#8B8F93]">
                    {format(new Date(sentAt), 'aaa h:mm', { locale: ko })}
                  </span>
                </div>
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
              className="m-0 max-h-[11.6rem] resize-none border-0 bg-transparent px-0 py-[0.8rem] text-[2rem] leading-none text-gray-black placeholder:text-[#B3B6BA] focus:outline-none focus:ring-0 focus-visible:ring-0"
              value={inputText}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              placeholder="챗봇에게 궁금한 점을 물어보세요!"
              rows={1}
              style={{ overflowY: 'hidden' }}
            />
          </div>
          <button
            type="button"
            aria-label="Send prompt"
            className="flex h-[3.64rem] w-[4.6rem] items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-300 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100"
            onClick={handleSendMessage}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
