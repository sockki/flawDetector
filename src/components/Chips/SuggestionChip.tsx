import { twMerge } from 'tailwind-merge';

type SuggestionChipProps = {
  variant: 'new' | 'hot' | 'warn' | 'notification' | 'report';

  isActive?: boolean;
};
export default function SuggestionChip({ variant, isActive = true }: SuggestionChipProps) {
  const baseClasses =
    'py-[0.8rem] px-[1.2rem] rounded-full bg-[#e8e8e8] text-gray-dark font-bold text-[1.6rem] w-fit ';

  const variantClasses = {
    new: 'text-white bg-system-assist',
    hot: 'text-white bg-system-warning',
    warn: 'text-system-warning bg-red-light',
    notification: 'text-primary-500 bg-primary-50',
    report: 'text-gray-default bg-gray-light',
  };

  return (
    <span className={twMerge(baseClasses, isActive && variantClasses[variant])}>
      {variant.toUpperCase()}
    </span>
  );
}
