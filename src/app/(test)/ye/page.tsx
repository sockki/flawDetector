'use client';

import AssistChip from '@/components/Chips/AssistChip';
import FilterChip from '@/components/Chips/FilterChip';
import InputChip from '@/components/Chips/InputChip';
import SuggestionChip from '@/components/Chips/SuggestionChip';
import { useState } from 'react';

const OPTION = ['옵션', '옵션1', '옵션2'];

export default function TestPage() {
  const [option, setOption] = useState('');

  const handleSelect = (v: string) => {
    setOption(() => v);
  };
  console.log(option);

  return (
    <>
      <h1 className="mb-3 text-xl font-bold">InputChip</h1>
      <InputChip label=".eslintrc.json" />
      <InputChip label=".eslintrc.json" leftIcon percentage={20} isRemovable />
      <InputChip label=".eslintrc.json" leftIcon isRemovable />
      <InputChip label=".eslintrc.json" leftIcon />
      <br />
      <hr />
      <br />
      <h1 className="mb-3 text-xl font-bold">AssistChip</h1>

      <AssistChip variant="outline" label="label" />
      <AssistChip variant="elevated" label="label" />
      <AssistChip variant="outline-primary" label="label" />
      <AssistChip variant="outline" label="label" disabled />
      <AssistChip variant="elevated" label="label" disabled />
      <AssistChip variant="outline-primary" label="label" disabled />
      <br />
      <br />
      <hr />
      <br />
      <h1 className="mb-3 text-xl font-bold">SuggestionChip</h1>

      <SuggestionChip variant="new" />
      <SuggestionChip variant="hot" />
      <SuggestionChip variant="warn" />
      <SuggestionChip variant="notification" />
      <SuggestionChip variant="report" />
      <SuggestionChip variant="new" isActive={false} />

      <br />
      <br />
      <hr />
      <br />
      <h1 className="mb-3 text-xl font-bold">FilterChip</h1>
      <FilterChip label="label" options={OPTION} hasIcon onSelect={handleSelect} />
      <FilterChip label="label" options={OPTION} onSelect={handleSelect} />
    </>
  );
}
