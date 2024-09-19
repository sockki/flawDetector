import { Modal } from '@/components/Modals';
import { SignOutIcon } from '@/public/index';

type LogoutModalProps = {
  isModalOpen: boolean;
  handleClickTrigger: () => void;
  confirmLogout: () => void;
};

export default function LogoutModal({
  isModalOpen,
  handleClickTrigger,
  confirmLogout,
}: LogoutModalProps) {
  return (
    <Modal gap={24} padding={32} hasShadow setIsModalOpen={handleClickTrigger} isOpen={isModalOpen}>
      <SignOutIcon />
      <Modal.Title size="sm">정말 로그아웃 할까요?</Modal.Title>
      <Modal.Text
        subtitle={[
          '소스코드 보안을 위하여 모든 히스토리와 코드 저장 내역이 삭제됩니다.',
          '아래 버튼을 누르면 모든 데이터를 삭제하게 되고 로그아웃 처리가 됩니다.',
        ]}
      />
      <Modal.Button
        buttonText={{ left: '닫기', right: '확인' }}
        variant="doubleButton"
        onClick={{
          left: handleClickTrigger,
          right: confirmLogout,
        }}
      />
    </Modal>
  );
}
