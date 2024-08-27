import ModalButton from '@/components/Modals/ModalButton';
import ModalRoot from '@/components/Modals/ModalRoot';
import ModalText from '@/components/Modals/ModalText';
import ModalTitle from '@/components/Modals/ModalTitle';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ModalRoot,
  args: { hasDimmed: true, isOpen: true },
  decorators: [
    Story => (
      <div id="modal">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ModalRoot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <ModalTitle size="lg" key={1}>
        모달타이틀
      </ModalTitle>,
      <ModalText subtitle={['서브타이틀']} key={3} />,
      <ModalButton variant="singleButton" buttonText="single" onClick={() => {}} key={2} />,
    ],
    setIsModalOpen: () => {},
    isOpen: true,
  },
};
