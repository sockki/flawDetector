import ModalRoot from '@/components/Modals/ModalRoot';
import ModalTitle from '@/components/Modals/ModalTitle';

export default function TestPage() {
  return (
    <ModalRoot>
      <ModalTitle size="sm">모달타이틀영역 작은거</ModalTitle>
      <ModalTitle size="lg">모달타이틀영역 큰거</ModalTitle>
    </ModalRoot>
  );
}
