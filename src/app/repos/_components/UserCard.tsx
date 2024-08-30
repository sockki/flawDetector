import Image from 'next/image';
import Link from 'next/link';
import { RightArrowIcon } from '@/public/index';

type UserCardProps = {
  avatar: string;
  email: string;
};

export default function UserCard({ avatar, email }: UserCardProps) {
  return (
    <section className="flex w-full items-center justify-between rounded-[4.2rem] bg-neutral-5 p-[3.2rem]">
      <div className="flex items-center gap-[4.4rem]">
        <Image src={avatar} alt="avatar" width={107} height={107} />
        <div className="text-[4rem] font-medium text-gray-black">
          <p>Hello,</p>
          <p>{email}</p>
        </div>
      </div>
      <Link href="/me">
        <RightArrowIcon />
      </Link>
    </section>
  );
}
