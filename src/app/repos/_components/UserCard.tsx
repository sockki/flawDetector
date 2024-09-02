'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/Button/Button';
import { Modal } from '@/components/Modals';
import { useModal } from '@/hooks/useModal';
import { RightArrowIcon, SignOutIcon } from '@/public/index';

type UserCardProps = {
  avatar: string;
  email: string;
  hasLogoutButton?: boolean;
};

export default function UserCard({ avatar, email, hasLogoutButton }: UserCardProps) {
  const router = useRouter();
  const [isModalOpen, handleClickTrigger] = useModal();

  const handleLogout = () => {
    handleClickTrigger();
    router.push('/');
  };

  const baseStyles = 'flex w-full items-center justify-between ';
  const logoutStyles = 'border-b border-b-[#e6e6e6]] pb-[8rem]';
  const defaultStyles = 'bg-neutral-5 rounded-[4.2rem] p-[3.2rem]';

  return (
    <section className={twMerge(baseStyles, hasLogoutButton ? logoutStyles : defaultStyles)}>
      <div className="flex items-center gap-[4.4rem]">
        <div className="relative h-[10.7rem] w-[10.7rem] overflow-hidden rounded-full">
          <Image
            src={avatar}
            alt="avatar"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="text-[4rem] font-medium text-gray-black">
          <p>Hello,</p>
          <p>{email}</p>
        </div>
      </div>
      {hasLogoutButton ? (
        <Button shape="rectangle" variant="tonal" size="large" onClick={handleClickTrigger}>
          로그아웃
        </Button>
      ) : (
        <Link href="/me">
          <RightArrowIcon />
        </Link>
      )}
      <Modal
        gap={24}
        padding={32}
        hasShadow
        setIsModalOpen={handleClickTrigger}
        isOpen={isModalOpen}
      >
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
            right: handleLogout,
          }}
        />
      </Modal>
    </section>
  );
}
