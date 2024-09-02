'use client';

import { useState } from 'react';
import { Switch } from '@/components/Switch/Switch';

export default function UserSetting() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col items-start gap-[7.1rem]">
      <div className="flex w-full items-center gap-[4.8rem]">
        <p className="w-[9.4rem] text-[2.4rem] font-bold">계정 유형</p>
        <p className="text-[2.4rem] font-regular">깃허브 연동</p>
      </div>
      <div className="flex w-full items-end gap-[4.8rem]">
        <p className="w-[9.4rem] text-[2.4rem] font-bold">알림</p>
        <div className="flex flex-grow items-center justify-between">
          <p className="text-[2.4rem] font-regular">
            이메일로 알림 받기
            <span className="text-[2.4rem] font-regular text-gray-default">
              (준비 중인 기능입니다.)
            </span>
          </p>
          <Switch isChecked={checked} onCheckedChange={newChecked => setChecked(newChecked)} />
        </div>
      </div>
    </div>
  );
}
