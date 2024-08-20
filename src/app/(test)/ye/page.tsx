'use client';

import { Modal } from '@/components/Modals';
import CheckedFileList from '@/components/common/CheckedFileList';
import { useModal } from '@/hooks/useModal';

const checkedData = [
  {
    fileName: 'Report_2024_08_19dddddsdhaskjdlkaj.pdf',
    subTitle: 'Quarterly Financial Report',
    createdAt: new Date(2024, 7, 19, 10, 30),
  },
  {
    fileName: 'Presentation_2024_08_18.pptx',
    subTitle: 'Project Kickoff Meeting',
    createdAt: new Date(2024, 7, 18, 15, 45),
  },
  {
    fileName: 'Notes_2024_08_17.docx',
    subTitle: 'Meeting Notes',
    createdAt: new Date(2024, 7, 17, 9, 0),
  },
  {
    fileName: 'Invoice_2024_08_16.pdf',
    subTitle: 'Client Invoice August',
    createdAt: new Date(2024, 7, 16, 14, 20),
  },
  {
    fileName: 'Agenda_2024_08_15.docx',
    subTitle: 'Weekly Team Meeting',
    createdAt: new Date(2024, 7, 15, 11, 0),
  },
  {
    fileName: 'Agenda_2024_08_15.docx',
    subTitle: 'Weekly Team Meeting',
    createdAt: new Date(2024, 7, 15, 11, 0),
  },
];

export default function TestPage() {
  const [isModalOpen, handleClickTrigger] = useModal();

  return (
    <div className="h-[2020rem]">
      <button onClick={handleClickTrigger} type="button">
        모달 띄우는 창
      </button>

      <Modal
        gap={24}
        padding={32}
        hasShadow
        hasDimmed
        setIsModalOpen={handleClickTrigger}
        isOpen={isModalOpen}
      >
        <Modal.Title size="sm">모달테스트 중 입니다.</Modal.Title>
        <CheckedFileList checkedData={checkedData} />
        <Modal.Text subtitle={['뭐라 적으실?', '두줄일경우']} helpText="그밑에 들어가는 텍스트" />
        <Modal.Button
          buttonText={{ left: 'left', right: 'right' }}
          variant="doubleButton"
          onClick={{
            left: () => {
              console.log('왼쪽');
            },
            right: () => {
              console.log('오른쪽');
            },
          }}
        />
        {/* <Modal.Button
            buttonText="button"
            variant="singleButton"
            onClick={() => {
              console.log('gi');
            }}
          /> */}
      </Modal>
    </div>
  );
}
