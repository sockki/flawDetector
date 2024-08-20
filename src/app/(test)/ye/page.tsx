'use client';

import { Modal } from '@/components/Modals';
import { useModal } from '@/hooks/useModal';

export default function TestPage() {
  const [isModalOpen, handleClickTrigger] = useModal();

  return (
    // <ModalRoot hasDimmed gap={24}>
    //   <ModalTitle size="sm">모달타이틀영역 작은거</ModalTitle>
    //   <ModalTitle size="lg">모달타이틀영역 큰거</ModalTitle>
    //   <ModalText subtitle={['설명하는 내용이 들어가는 영역']} helpText="help text" />
    //   <ModalText
    //     subtitle={[
    //       'AI 플로디텍터가 문제를 분석중 입니다.',
    //       '코드가 많을수록 처리시간이 길어집니다.',
    //     ]}
    //     helpText="help text"
    //   />
    // </ModalRoot>
    // <ModalRoot hasShadow gap={24}>
    //   <ModalTitle size="sm">모달타이틀영역 작은거</ModalTitle>
    //   <ModalTitle size="lg">모달타이틀영역 큰거</ModalTitle>
    //   <ModalText subtitle={['설명하는 내용이 들어가는 영역']} helpText="help text" />
    //   <ModalText
    //     subtitle={[
    //       'AI 플로디텍터가 문제를 분석중 입니다.',
    //       '코드가 많을수록 처리시간이 길어집니다.',
    //     ]}
    //     helpText="help text"
    //   />
    //   <BugIcon />
    //   <CheckedFileList />
    // </ModalRoot>
    <>
      <button onClick={handleClickTrigger} type="button">
        모달 띄우는 창
      </button>
      {isModalOpen && (
        <Modal gap={24} padding={32} hasShadow hasDimmed setIsModalOpen={handleClickTrigger}>
          <Modal.Title size="sm">모달테스트 중 입니다.</Modal.Title>
          <Modal.Button buttonText="djd" variant="singleButton" onClick={() => {}} />
        </Modal>
      )}
    </>
  );
}
