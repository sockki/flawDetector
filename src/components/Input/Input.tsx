import { forwardRef, ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = ComponentPropsWithRef<'input'> & {
  variant?: 'default' | 'error';
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, variant = 'default', disabled = false, ...rest },
  ref,
) {
  const baseStyle =
    'w-[86.6rem] h-[5.1rem] rounded-[0.8rem] p-[1.2rem] border font-medium text-[1.8rem] placeholder:text-gray-light outline-none';
  const focusedStyle =
    'hover:bg-purple-light hover:border-neutral-10 hover:text-[#3f3f3f] focus:border-primary-500 focus:text-[#3f3f3f]';
  const variantStyles = {
    default: 'border-neutral-10 text-gray-dark',
    error: 'bg-red-light border-system-warning text-[#3f3f3f]',
  };
  const disabledStyles = 'bg-gray-light placeholder:text-[#d6d6d6] cursor-not-allowed';

  const combinedClasses = twMerge(
    baseStyle,
    variantStyles[variant],
    disabled ? disabledStyles : focusedStyle,
    className,
  );
  return <input ref={ref} className={combinedClasses} disabled={disabled} {...rest} />;
});

Input.displayName = 'Input';

export default Input;
