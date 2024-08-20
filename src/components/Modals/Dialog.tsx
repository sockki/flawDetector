import { Modal } from '.';

export default function Dialog() {
  // const style = {
  //   sm: {
  //     padding: 32,
  //     gap: 24,
  //     hasDimmed: false,
  //     hasShadow: true,
  //   },
  //   lg: {
  //     padding: 48,
  //     gap: 32,
  //     hasDimmed: false,
  //     hasShadow: true,
  //   },
  // };
  return (
    <Modal gap={24} padding={32} hasShadow hasDimmed setIsModalOpen={}>
      <Modal.Title size="sm">모달테스트 중 입니다.</Modal.Title>
      <Modal.Button buttonText="djd" variant="singleButton" onClick={() => {}} />
    </Modal>
  );
}
