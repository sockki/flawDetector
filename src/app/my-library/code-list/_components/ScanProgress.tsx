import InputChip from '@/components/Chips/InputChip';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';

export function ScanProgress() {
  const containerStyles =
    'border-primary-purple-100 mb-[2rem] mt-[2rem] h-[10.7rem] w-[148.4rem] gap-[2rem] rounded-tl-[0.8rem] border border-t-[0.1rem] p-[2rem] pt-[2rem]';
  return (
    <div className={containerStyles}>
      <div className="flex">
        <InputChip label=".eslintrc.json" leftIcon percentage={56} isRemovable />
        <InputChip label=".eslintrc.json" leftIcon isRemovable />
        <InputChip label=".eslintrc.json" leftIcon isRemovable />
        <InputChip label=".eslintrc.json" leftIcon isRemovable />
        <InputChip label=".eslintrc.json" leftIcon isRemovable />
      </div>
      <ProgressBar progress={70} />
    </div>
  );
}
