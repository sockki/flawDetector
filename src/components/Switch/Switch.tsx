import * as SwitchPrimitive from '@radix-ui/react-switch';
import { twMerge } from 'tailwind-merge';
import { ComponentProps } from 'react';
import { CheckIcon, CrossIcon } from '@/public/index';

type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  onCheckedChange: (checked: boolean) => void;
  isChecked: boolean;
  disabled?: boolean;
  hasIcon?: boolean;
};

export function Switch({
  onCheckedChange,
  isChecked,
  disabled = false,
  hasIcon = false,
  ...rest
}: SwitchProps) {
  const rootStyles = twMerge(
    'group flex h-[3.2rem] w-[5.2rem] items-center rounded-full p-[0.2rem] px-[0.4rem] data-[state=unchecked]:border-2 data-[state=unchecked]:border-solid data-[state=unchecked]:border-[#ADADAD] data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-primary-50',
    disabled ? 'opacity-30' : '',
  );

  const firstThumbStyles =
    'absolute z-10 h-[4.0rem] w-[4.0rem] rounded-full opacity-5 data-[state=checked]:translate-x-[1.2rem] data-[state=unchecked]:translate-x-[-1.2rem] data-[state=checked]:hover:bg-[#6750A4] data-[state=unchecked]:hover:bg-[#1D1B10] data-[state=unchecked]:focus:bg-primary-200 data-[state=unchecked]:active:bg-primary-200 data-[state=unchecked]:active:opacity-50';

  const secondThumbStyles = twMerge(
    'absolute flex rounded-full items-center justify-center transition-transform duration-300 data-[state=checked]:w-[2.4rem] data-[state=checked]:h-[2.4rem] data-[state=checked]:translate-x-[2.0rem] data-[state=unchecked]:translate-x-0 data-[state=checked]:bg-white data-[state=unchecked]:bg-[#79747E] data-[state=unchecked]:group-hover:bg-gray-black data-[state=unchecked]:group-active:z-20 data-[state=checked]:group-active:h-[2.8rem] data-[state=unchecked]:group-active:h-[2.8rem] data-[state=checked]:group-active:w-[2.8rem] data-[state=unchecked]:group-active:w-[2.8rem] data-[state=checked]:group-active:translate-x-[1.8rem] data-[state=unchecked]:group-active:translate-x-[-0.4rem] data-[state=unchecked]:group-active:bg-gray-black data-[state=checked]:group-active:duration-0 data-[state=unchecked]:group-active:duration-0',
    hasIcon
      ? 'data-[state=unchecked]:h-[2.4rem] data-[state=unchecked]:w-[2.4rem]'
      : 'data-[state=unchecked]:h-[1.6rem] data-[state=unchecked]:w-[1.6rem]',
  );

  return (
    <SwitchPrimitive.Root
      onCheckedChange={onCheckedChange}
      checked={isChecked}
      disabled={disabled}
      className={rootStyles}
      {...rest}
    >
      <SwitchPrimitive.Thumb className={firstThumbStyles} />
      <SwitchPrimitive.Thumb className={secondThumbStyles}>
        {hasIcon && (isChecked ? <CheckIcon /> : <CrossIcon />)}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}
