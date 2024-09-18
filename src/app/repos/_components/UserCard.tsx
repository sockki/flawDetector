'use client';

import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/Button/Button';
import { useModal } from '@/hooks/useModal';
import { useLogout } from '@/hooks/useLogout';
import { RightArrowIcon } from '@/public/index';
import LogoutModal from './LogoutModal';

type UserCardProps = {
  user: {
    image?: string | null;
    email?: string | null;
    id?: string;
  };
  hasLogoutButton?: boolean;
};

export default function UserCard({ user, hasLogoutButton }: UserCardProps) {
  const [isModalOpen, handleClickTrigger] = useModal();
  const { handleLogout } = useLogout();

  const avatar = user?.image || '';
  const email = user?.email || '';
  const userId = user?.id || '';

  const confirmLogout = async () => {
    await handleLogout(userId);
    handleClickTrigger();
  };

  const baseStyles = 'flex w-full min-w-[131.4rem] items-center justify-between ';
  const logoutStyles = 'border-b border-b-neutral-10 pb-[8rem]';
  const defaultStyles = 'bg-neutral-5 rounded-[4.2rem] p-[3.2rem]';

  return (
    <Link
      href="/me"
      className={twMerge(baseStyles, hasLogoutButton ? logoutStyles : defaultStyles)}
    >
      <div className="flex items-center gap-[4.4rem]">
        <div className="relative h-[10.7rem] w-[10.7rem] overflow-hidden rounded-full">
          {avatar ? (
            <Image
              src={avatar}
              alt="User Avatar"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            ''
          )}
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
        <RightArrowIcon />
      )}
      <LogoutModal
        isModalOpen={isModalOpen}
        handleClickTrigger={handleClickTrigger}
        confirmLogout={confirmLogout}
      />
    </Link>
  );
}
