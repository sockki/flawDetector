'use client';

import { FloatingButton } from '../../../components/Floating/FloatingButton';

const generateContent = (count: number) => {
  const content = [];
  for (let i = 1; i <= count; i += 1) {
    content.push(<p key={i}>{i}</p>);
  }
  return content;
};

export default function HomeApp() {
  return (
    <div>
      <div className="p-4">{generateContent(100)}</div>

      <FloatingButton type="top" />
      {/* <FloatingButton type="ask" /> */}
    </div>
  );
}
