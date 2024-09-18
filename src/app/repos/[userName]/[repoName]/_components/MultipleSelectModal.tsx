import CheckedFileList, { FileItemResponse } from '@/components/common/CheckedFileList';
import { Modal } from '@/components/Modals';
import ModalTitle from '@/components/Modals/ModalTitle';

type MultipleSelectModalProps = {
  onHandleModalOpen: () => void;
  isModalOpen: boolean;
  modalData: FileItemResponse[];
  onMultipleCodeScan: () => void;
};

export function MultipleSelectModal({
  onHandleModalOpen,
  isModalOpen,
  modalData,
  onMultipleCodeScan,
}: MultipleSelectModalProps) {
  return (
    <Modal
      gap={24}
      padding={32}
      hasShadow
      hasDimmed
      setIsModalOpen={onHandleModalOpen}
      isOpen={isModalOpen}
    >
      {modalData.length > 0 ? (
        <>
          <ModalTitle size="sm">선택된 파일을 검사하시겠습니까?</ModalTitle>
          <CheckedFileList checkedData={modalData} />
          <Modal.Button
            buttonText={{ left: '취소', right: '검사하기' }}
            variant="doubleButton"
            onClick={{
              left: () => {
                onHandleModalOpen();
              },
              right: () => {
                onMultipleCodeScan();
              },
            }}
          />
        </>
      ) : (
        <Modal.Title size="lg"> 선택된 파일이 없습니다. </Modal.Title>
      )}
    </Modal>
  );
}
