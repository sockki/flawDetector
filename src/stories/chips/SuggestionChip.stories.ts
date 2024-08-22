import SuggestionChip from '@/components/Chips/SuggestionChip';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SuggestionChip> = {
  component: SuggestionChip,
  args: {

    variant:"hot"
  }
};
export default meta;

type Story = StoryObj<typeof SuggestionChip>;

export const New: Story = { args: { variant: 'new' } };
export const Hot: Story = { args: { variant: 'hot' } };
export const Warn: Story = { args: { variant: 'warn' } };
export const Notification: Story = { args: { variant: 'notification' } };
export const Report: Story = { args: { variant: 'report' } };
export const InActive: Story = { args: { isActive: false } };
