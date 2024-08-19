import InputChip from '@/components/Chips/InputChip';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InputChip> = {
  component: InputChip,
  args: {
    label: '.eslintrc.json',
  },
};
export default meta;

type Story = StoryObj<typeof InputChip>;

export const TextOnly: Story = {};
export const SideIcons: Story = { args: { leftIcon: true, isRemovable: true } };
export const Percentage: Story = { args: { leftIcon: true, percentage: 30, isRemovable: true } };
export const LeftIcon: Story = { args: { leftIcon: true } };
