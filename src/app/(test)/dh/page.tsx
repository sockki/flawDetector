'use client';

import { Switch } from '@/components/Switch/Switch';
import { useState } from 'react';

export default function Dh() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckedChange = (checked: boolean) => {
    setIsChecked(checked);
  };
  return (
    <div>
      <Switch onCheckedChange={handleCheckedChange} checked={isChecked} />
      test
    </div>
  );
}
