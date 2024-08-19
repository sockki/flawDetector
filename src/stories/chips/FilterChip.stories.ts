import FilterChip from '@/components/Chips/FilterChip';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FilterChip> = {
  component: FilterChip,
  args: {
    label: 'label',
    options: ['옵션1', '옵션2', '옵션3'],
    hasIcon: false,
    onSelect: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof FilterChip>;

export const HasIcon: Story = { args: { hasIcon: true } };
