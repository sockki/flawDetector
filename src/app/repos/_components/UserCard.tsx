import Image from 'next/image';
import Link from 'next/link';
import { RightArrowIcon } from '@/public/index';
import Button from '@/components/Button/Button';
import { twMerge } from 'tailwind-merge';

type UserCardProps = {
  avatar: string;
  email: string;
  hasLogoutButton?: boolean;
  onButtonClick?: () => void;
};

export default function UserCard({ avatar, email, hasLogoutButton, onButtonClick }: UserCardProps) {
  const baseStyles = 'flex w-full items-center justify-between ';

  const logoutStyles = 'border-b border-b-[#e6e6e6]] pb-[8rem]';
  const defaultStyles = 'bg-neutral-5 rounded-[4.2rem] p-[3.2rem]';

  return (
    <section className={twMerge(baseStyles, hasLogoutButton ? logoutStyles : defaultStyles)}>
      <div className="flex items-center gap-[4.4rem]">
        <Image src={avatar} alt="avatar" width={107} height={107} />
        <div className="text-[4rem] font-medium text-gray-black">
          <p>Hello,</p>
          <p>{email}</p>
        </div>
      </div>
      {hasLogoutButton ? (
        <Button shape="rectangle" variant="tonal" size="large" onClick={onButtonClick}>
          로그아웃
        </Button>
      ) : (
        <Link href="/me">
          <RightArrowIcon />
        </Link>
      )}
    </section>
  );
}
