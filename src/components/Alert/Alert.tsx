'use client';

import {
  AlertCloseIcon,
  AlertStatusCheckingIcon,
  AlertStatusCompleteIcon,
  AlertStatusErrorIcon,
  alertStatusWaitingGif,
} from '@/public/index';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';

type AlertProps = {
  type: 'waiting' | 'checking' | 'error' | 'complete';
};

const alertConfig = {
  waiting: {
    icon: <Image src={alertStatusWaitingGif} alt="모래시계" width={48} height={48} />,
    status: '검사 대기중...',
    subText: ['순차적으로 파일 검사가 진행됩니다.', '잠시만 대기해주시면 검사가 시작됩니다.'],
  },
  checking: {
    icon: <AlertStatusCheckingIcon className="animate-spin360" />,
    status: '검사중...',
    subText: ['코드가 많을수록 처리시간이 길어집니다.'],
  },
  error: {
    icon: <AlertStatusErrorIcon />,
    status: 'Error',
    subText: ['오류가 발생했습니다.', ' 다시 시도해주세요.'],
  },
  complete: {
    icon: <AlertStatusCompleteIcon />,
    status: '프로젝트 검사 완료',
    subText: ['검사 결과를 확인해보세요.'],
  },
};

export default function Alert({ type }: AlertProps) {
  const router = useRouter();
  const handleClickRetry = () => {
    console.log('다시시도 로직 짜주세욤');
  };

  const handleClickResult = () => {
    // 결과 url로 이동하게 해주세욤
    router.push('/');
  };

  const alertButton = {
    error: {
      buttonText: '다시 시도하기',
      onClick: handleClickRetry,
    },
    complete: {
      buttonText: '결과 보러가기',
      onClick: handleClickResult,
    },
  };
  return (
    <div className="flex w-fit min-w-[49.4rem] items-start justify-between gap-[1.8rem] rounded-[1.6rem] p-[3.2rem] shadow-drop">
      {alertConfig[type].icon}
      <div className="mt-[1rem] flex flex-1 flex-col gap-[1.2rem] text-[2rem]">
        <h4>{alertConfig[type].status}</h4>
        <div className="text-gray-default">
          {alertConfig[type].subText.map(message => (
            <p key={message}>{message}</p>
          ))}
        </div>
        {(type === 'error' || type === 'complete') && (
          <Button
            shape="rectangle"
            className="w-full font-regular"
            onClick={alertButton[type].onClick}
          >
            {alertButton[type].buttonText}
          </Button>
        )}
      </div>
      <button type="button">
        <AlertCloseIcon />
      </button>
    </div>
  );
}
