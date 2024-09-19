'use client';

import {
  AlertCloseIcon,
  AlertStatusCheckingIcon,
  AlertStatusCompleteIcon,
  AlertStatusErrorIcon,
  alertStatusWaitingGif,
} from '@/public/index';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import Button from '../Button/Button';

type AlertProps = {
  type: 'enabled' | 'analye' | 'waiting' | 'success' | 'error';
  onAlertClick?: () => void;
  isAlertOpen: boolean;
  onAlertHandle: () => void;
};

const alertConfig = {
  waiting: {
    icon: <Image src={alertStatusWaitingGif} alt="모래시계" width={48} height={48} />,
    status: '검사 대기중...',
    subText: ['순차적으로 파일 검사가 진행됩니다.', '잠시만 대기해주시면 검사가 시작됩니다.'],
  },
  analye: {
    icon: <AlertStatusCheckingIcon className="animate-spin360" />,
    status: '검사중...',
    subText: ['코드가 많을수록 처리시간이 길어집니다.'],
  },
  error: {
    icon: <AlertStatusErrorIcon />,
    status: 'Error',
    subText: ['오류가 발생했습니다.', ' 다시 시도해주세요.'],
  },
  success: {
    icon: <AlertStatusCompleteIcon />,
    status: '프로젝트 검사 완료',
    subText: ['검사 결과를 확인해보세요.'],
  },
  enabled: {
    icon: '',
    status: '',
    subText: [''],
  },
};

export default function Alert({ type, onAlertClick, isAlertOpen, onAlertHandle }: AlertProps) {
  const path = usePathname();

  const alertButton = {
    error: {
      buttonText: '다시 시도하기',
    },
    success: {
      buttonText: '결과 보러가기',
    },
    issue: {
      buttonText: '결과 보러가기',
    },
  };
  return (
    <div
      className={twMerge(
        isAlertOpen
          ? 'flex w-fit min-w-[49.4rem] items-start justify-between gap-[1.8rem] rounded-[1.6rem] p-[3.2rem] shadow-drop'
          : 'hidden',
        path.split('/')[path.split('/').length - 1] === 'repo_inspection' && type == 'success'
          ? 'hidden'
          : '',
        type === 'enabled' ? 'hidden' : '',
      )}
    >
      {alertConfig[type].icon}
      <div className="mt-[1rem] flex flex-1 flex-col gap-[1.2rem] text-[2rem]">
        <h4>{alertConfig[type].status}</h4>
        <div className="text-gray-default">
          {alertConfig[type].subText.map(message => (
            <p key={message}>{message}</p>
          ))}
        </div>
        {(type === 'error' || type === 'success') && (
          <Button shape="rectangle" className="w-full font-regular" onClick={onAlertClick}>
            {alertButton[type].buttonText}
          </Button>
        )}
      </div>
      <button type="button" onClick={() => onAlertHandle()}>
        <AlertCloseIcon />
      </button>
    </div>
  );
}
