import Button from '@/components/Button/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'tonal'],
    },
    shape: {
      control: 'select',
      options: ['rectangle', 'rounded'],
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'button',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: {
    variant: 'filled',
    shape: 'rounded',
    size: 'default',
    disabled: false,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    shape: 'rectangle',
    size: 'large',
    disabled: false,
  },
};

export const Tonal: Story = {
  args: {
    variant: 'tonal',
    shape: 'rounded',
    size: 'small',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'filled',
    shape: 'rectangle',
    size: 'default',
    disabled: true,
  },
};
