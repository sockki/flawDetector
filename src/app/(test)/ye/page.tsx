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
  );
}
