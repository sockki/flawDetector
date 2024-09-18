import { ListCheckIcon } from '@/public/index';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { twMerge } from 'tailwind-merge';

type CheckBoxProps = {
  checked: boolean;
  onCheckedChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export function CheckBox({ checked, onCheckedChange }: CheckBoxProps) {
  return (
    <CheckboxPrimitive.Root
      className={twMerge(
        'flex h-[2rem] w-[2rem] items-center justify-center rounded-[0.5rem] border bg-white',
        checked ? 'bg-primary-500' : '',
      )}
      checked={checked}
      onClick={onCheckedChange}
    >
      <CheckboxPrimitive.Indicator>
        {checked ? <ListCheckIcon className="fill-white" /> : ''}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
