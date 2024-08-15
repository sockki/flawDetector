import InputChip from '@/components/Chips/InputChip';

export default function TestPage() {
  return (
    <>
      <div>TestPage</div>
      <InputChip label=".eslintrc.json" />
      <InputChip label=".eslintrc.json" leftIcon percentage={20} isRemovable />
      <InputChip label=".eslintrc.json" leftIcon isRemovable />
      <InputChip label=".eslintrc.json" leftIcon />
    </>
  );
}
