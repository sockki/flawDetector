'use client';

import { FloatingButton } from '../../../components/Floating/FloatingButton';

export default function HomeApp() {
  return (
    <div>
      <div className="h-[100rem]">아무글자</div>
      <FloatingButton
        type="ask"
        onClick={() => alert('Ask Button Clicked!')}
        className="fixed bottom-4 right-4"
      />
      <FloatingButton type="top" className="fixed bottom-4 left-4" />
    </div>
  );
}
