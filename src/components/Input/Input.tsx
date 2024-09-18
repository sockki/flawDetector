import { forwardRef, ComponentPropsWithoutRef, Ref } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = ComponentPropsWithoutRef<'input'> &
  ComponentPropsWithoutRef<'textarea'> & {
    variant?: 'default' | 'error';
    isMultiline?: boolean;
  };

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(function Input(
  {
    className,
    variant = 'default',
    disabled = false,
    isMultiline = false,
    readOnly = false,
    ...rest
  },
  ref,
) {
  const baseStyle =
    'w-[86.6rem] rounded-[0.8rem] border p-[1.2rem] text-[1.8rem] font-medium outline-none placeholder:text-gray-light';
  const focusedStyle =
    'hover:border-neutral-10 hover:bg-purple-light hover:text-[#3f3f3f] focus:border-primary-500 focus:text-[#3f3f3f]';
  const variantStyles = {
    default: 'border-neutral-10 text-gray-dark',
    error: 'border-system-warning bg-red-light text-[#3f3f3f]',
  };
  const inactiveStyles = 'cursor-not-allowed bg-gray-light placeholder:text-[#d6d6d6]';

  const combinedClasses = twMerge(
    baseStyle,
    variantStyles[variant],
    disabled || readOnly ? inactiveStyles : focusedStyle,
    className,
  );

  if (isMultiline) {
    return (
      <textarea
        ref={ref as Ref<HTMLTextAreaElement>}
        className={twMerge(combinedClasses, 'resize-none')}
        disabled={disabled}
        readOnly={readOnly}
        tabIndex={disabled || readOnly ? -1 : undefined}
        {...rest}
      />
    );
  }

  return (
    <input
      ref={ref as Ref<HTMLInputElement>}
      className={combinedClasses}
      disabled={disabled}
      readOnly={readOnly}
      tabIndex={disabled || readOnly ? -1 : undefined}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
