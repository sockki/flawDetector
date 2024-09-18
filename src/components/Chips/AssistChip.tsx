import { twMerge } from 'tailwind-merge';

type AssistChipProps = {
  variant?: 'outline' | 'elevated' | 'outline-primary';
  label: string;
  disabled?: boolean;
};

export default function AssistChip({ variant = 'outline', label, disabled }: AssistChipProps) {
  const baseClasses =
    'inline-block cursor-default rounded-full bg-black px-[1.2rem] py-[0.7rem] text-[1.6rem] hover:bg-opacity-8 focus:bg-opacity-12 focus:outline-none selection:shadow-button';

  const variantClasses = {
    outline: 'border border-gray-black bg-black bg-opacity-0',
    elevated: 'bg-purple-light hover:bg-[#7E5AFF] focus:bg-[#7E5AFF]',
    'outline-primary':
      'border border-primary-300 bg-purple-light text-primary-500 hover:bg-[#7E5AFF] focus:bg-[#7E5AFF] focus:border-primary-500 ',
  };

  const disabledClasses = {
    outline: 'bg-white border-gray-default text-gray-default',
    elevated: 'bg-purple-light text-purple-dark hover:bg-opacity-1',
    'outline-primary':
      'border border-primary-300 text-purple-dark hover:bg-purple-light bg-opacity-0',
  };

  return (
    <span
      className={twMerge(
        baseClasses,
        disabled ? disabledClasses[variant] : variantClasses[variant],
      )}
      tabIndex={disabled ? -1 : 0}
    >
      {label}
    </span>
  );
}
