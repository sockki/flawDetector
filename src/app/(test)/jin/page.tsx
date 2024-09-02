'use client';

import { FloatingButton } from '../../../components/Floating/FloatingButton';

export default function HomeApp() {
  return (
    <div>
      <div className="h-[1000rem]">아무글자</div>
      <FloatingButton type="ask" onClick={() => alert('Ask Button Clicked!')} />
      <FloatingButton type="top" />
    </div>
  );
}
