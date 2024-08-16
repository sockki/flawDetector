import AssistChip from '@/components/Chips/AssistChip';
import InputChip from '@/components/Chips/InputChip';

export default function TestPage() {
  return (
    <>
      <div>TestPage</div>
      <AssistChip variant="outline" label="label" />
      <AssistChip variant="elevated" label="label" />
      <AssistChip variant="outline-primary" label="label" />
      <AssistChip variant="outline" label="label" disabled />
      <AssistChip variant="elevated" label="label" disabled />
      <AssistChip variant="outline-primary" label="label" disabled />
      <InputChip label=".eslintrc.json" />
      <InputChip label=".eslintrc.json" leftIcon percentage={20} isRemovable />
      <InputChip label=".eslintrc.json" leftIcon isRemovable />
      <InputChip label=".eslintrc.json" leftIcon />
    </>
  );
}
