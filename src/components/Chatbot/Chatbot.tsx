'use client';

import { useState } from 'react';

// Message 인터페이스 정의
type Message = {
  sender: 'user' | 'bot';
  content: string;
};

export default function ChatBot() {
  // messages 상태를 Message[] 타입으로 정의
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const sendMessage = async () => {
    if (!input) return;

    const newMessage: Message = { sender: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    const response = await fetch('/api/generateMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_message: input,
        temperature: 0.9,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'bot', content: 'Error: Failed to generate response' },
      ]);
      return;
    }

    const data = await response.json();

    const botMessage: Message = { sender: 'bot', content: data.generatedMessage };
    setMessages(prevMessages => [...prevMessages, botMessage]);
    console.log(data);
    setInput(''); // 입력 필드 초기화
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded border p-4">
        <div className="mb-4">
          {messages.map((msg, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`my-2 rounded p-2 ${msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="메시지를 입력하세요"
          className="mb-2 w-full rounded border p-2"
        />
        <button
          type="button"
          onClick={sendMessage}
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          전송
        </button>
      </div>
    </div>
  );
}
