import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRef } from 'react';
import { Modal } from '.';

export default function Dialog({ setClose }: { setClose: (v: boolean) => void }) {
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setClose(true);
  });
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
    <Modal gap={24} padding={32} hasShadow ref={ref} hasDimmed>
      <Modal.Title size="sm">모달테스트 중 입니다.</Modal.Title>
      <Modal.Button buttonText="djd" variant="singleButton" onClick={() => {}} />
    </Modal>
  );
}
