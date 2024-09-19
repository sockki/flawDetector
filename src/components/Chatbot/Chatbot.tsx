'use client';

import { BugIcon, ChatbotIcon, SendIcon } from '@/public/index';
import { Content } from '@/types/crawlingData';
import { format } from 'date-fns/format';
import { ko } from 'date-fns/locale';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

// 미트볼 아이콘
function MeatballIcon() {
  return (
    <div className="flex h-[2rem] animate-pulse items-center justify-center gap-[0.4rem]">
      <div className="h-2 w-2 rounded-full bg-gray-400" />
      <div className="h-2 w-2 rounded-full bg-gray-400" />
      <div className="h-2 w-2 rounded-full bg-gray-400" />
    </div>
  );
}

type Message = {
  sender: 'user' | 'bot';
  content: string;
  sentAt: string;
};

export type Report = { title: string; desc: Content[] };

export default function Chatbot({ report }: { report: Report }) {
  const [message, setMessage] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
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
    if (inputText.trim() && !loading) {
      const content = inputText;
      setInputText('');
      setLoading(true); // 로딩 상태를 true로 설정
      setMessage(prevMessages => [
        ...prevMessages,
        { sender: 'user', content, sentAt: new Date().toISOString() },
        { sender: 'bot', content: 'thinking', sentAt: new Date().toISOString() }, // 로딩 중일 때 미트볼 아이콘 표시
      ]);

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      const promptMessage = `
      보고서 제목: ${report.title}
      보고서 내용: ${report.desc}
      사용자 질문: "${content}"
      
      당신은 한국어로 소통하는 챗봇입니다. 한국 정서에 맞춰 사용자와 친절하게 대화하며, 모든 응답은 높임말을 사용해야 합니다. 보고서 내용에 따라 상황별로 적절하게 답변하세요.
      
      #조건

      [인사 관련]
      
      사용자가 인사(예: "안녕하세요", "하이")를 한 경우, 먼저 친근하고 예의 바르게 "안녕하세요! 무엇을 도와드릴까요?" 라고 응답해줘

      만약 사용자가 인사를 하지 않았다면, 인사 없이 바로 질문에 대한 답변을 해주세요.

      [보고서 관련 질문 응답]
      
      사용자의 질문이 보고서 내용과 직접적으로 관련이 있을 경우, 인사 없이 보고서 내용을 바탕으로 **간결**하고 명확하게 대답하세요.
      예시: 사용자가 보고서의 특정 부분에 대해 질문할 때는 그 부분에 대한 요약이나 추가 설명을 제공하세요.
      만약 보고서 내용에서 사용자가 요청한 정보가 부족하다면, "보고서에 해당 내용이 포함되어 있지 않지만, 관련 정보는 추가적으로 확인하실 수 있습니다"라고 답변하세요.

      [보고서 외 질문]
      
      질문이 보고서 내용과 관련이 없는 경우, 예를 들어 일상적인 질문이나 다른 주제(예: "스타벅스 가격 알려줘")일 때는 다음과 같이 정중히 응답하세요:
      "죄송하지만, 저는 보고서와 관련된 질문에만 답변드릴 수 있어요. 다른 궁금한 점이 있으면 언제든지 말씀해 주세요!"
      추가로 반복되는 질문이 있을 경우는, "해당 주제는 지원하지 않습니다"로 간결하게 마무리하세요.
      
      
      사용자가 보고서의 여러 부분에 대해 질문할 경우, 연결된 정보를 제공하여 일관성 있게 설명하세요.

      [정확한 정보 제공]
      
      보고서의 내용에서 잘못된 정보를 제공하지 않도록 주의하며, 불확실한 정보에 대해 답변을 회피하는 대신 "해당 부분은 추가적인 확인이 필요합니다"라는 문구를 사용하세요.

      [친절한 어조]
      
      사용자가 오해할 수 있는 표현이나 어조는 피하고, 항상 친절하고 공손하게 답변하세요.
      만약 질문이 애매하거나 모호할 경우, "질문을 조금 더 구체적으로 말씀해 주실 수 있을까요?"라고 물어봐서 정확한 답변을 할 수 있도록 유도하세요.
      추가 도움 제안:
      
      보고서와 관련된 질문을 해결한 후, "더 궁금한 점이 있으시면 언제든지 물어보세요"와 같이 추가 도움을 제안하는 문구로 대화를 마무리하세요.

      [예외 처리]
      
      만약 사용자가 보고서 내용과 관련 없는 질문을 반복적으로 하거나, 부적절한 질문을 할 경우에는 경고 메시지를 보내고, 그럼에도 불구하고 반복된다면 대화를 종료하도록 설정하세요.
      예시: "다시 한번 말씀드리지만, 보고서와 관련된 질문만 답변드릴 수 있습니다."
      특정 질문에 대한 맞춤형 대응:
      
      사용자가 보고서에 특정 문장을 인용하거나 특정 부분을 지적했을 때, 그 부분에 대한 추가적인 정보를 제공하세요.
      만약 보고서가 아닌 외부 자료가 필요할 경우, "해당 주제는 보고서에 포함되지 않았습니다. 추가 자료가 필요할 수 있습니다."라고 응답하세요.

      [대화 예시]

      사용자: "보고서에서 데이터 분석 부분 좀 더 설명해 주세요."
      챗봇: "보고서에서 데이터 분석 부분은 데이터를 수집하고 이를 분류하여 패턴을 찾는 과정입니다. 자세한 분석 방법은 보고서 3장에 나와 있으며, 추가적인 통계 방법도 포함되어 있습니다."
      
      사용자: "애국가 가사 알려줘."
      챗봇: "죄송하지만, 저는 보고서와 관련된 질문에만 답변드릴 수 있어요. 다른 궁금한 점이 있으면 언제든지 말씀해 주세요!"


      조건 1: 사용자가 인사말을 하지 않았다면, 바로 질문에 대한 답변을 해주세요.
      조건 2: 보고서 내용을 잘 읽고, 그에 대해 간단하고 정중하게 답변해 주세요.
      조건 3: 사용자가 인사나 일반적인 대화를 한다면, 친근하고 예의 바르게 응답해 주세요. 예를 들어, "안녕하세요?"라고 하면 "안녕하세요! 무엇을 도와드릴까요?"라고 답변하세요.
      조건 4: 질문이 보고서 내용과 관련된 경우, *인사말 없이* 바로 정중하게 답변해 주세요.
      조건 5: 사용자의 질문이 보고서와 관련이 없다면, 다음과 같이 응답해 주세요: "죄송하지만, 저는 보고서와 관련된 질문에만 답변드릴 수 있어요. 다른 궁금한 점이 있으면 언제든지 말씀해 주세요!"
            예시: "스타벅스 텀블러 가격 알려줘", "애국가 가사 알려줘" 등.
      조건 6: 모든 답변은 한국어로만 해주세요.
      조건 7: 답변에 한자는 사용하지 말아주세요.
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

        setMessage(prevMessage =>
          prevMessage.map((msg, index) => {
            if (index === prevMessage.length - 1 && msg.sender === 'bot') {
              return { ...msg, content: data.message }; // 로딩 중인 메시지를 실제 응답으로 교체
            }
            return msg;
          }),
        );
      } catch (error) {
        console.error('응답 생성 실패:', error);
      } finally {
        setLoading(false);
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
    <div className="flex h-[72.6rem] w-[55.8rem] flex-col justify-between overflow-hidden rounded-[2.4rem] bg-white shadow-button">
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
                    {content === 'thinking' ? <MeatballIcon /> : content}
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
              disabled={loading} // 로딩 중일 때 비활성화
            />
          </div>
          <button
            type="button"
            aria-label="Send prompt"
            className="flex h-[3.64rem] w-[4.6rem] items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-300 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100"
            onClick={handleSendMessage}
            disabled={loading} // 로딩 중일 때 버튼 비활성화
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-white" /> // 로딩 중일 때 아이콘 대신 스피너 표시
            ) : (
              <SendIcon />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
