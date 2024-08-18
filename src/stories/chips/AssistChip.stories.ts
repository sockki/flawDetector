import AssistChip from '@/components/Chips/AssistChip';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AssistChip> = {
  component: AssistChip,
  args: {
    label: 'label',
  },
};
export default meta;

type Story = StoryObj<typeof AssistChip>;

export const Outline: Story = {};
export const Elevated: Story = { args: { variant: 'elevated' } };
export const OutlinePrimary: Story = { args: { variant: 'outline-primary' } };
