'use client';

import { LogoIcon } from '@/public/index';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { signOut } from 'next-auth/react';

type HeaderProps = {
  isLoggedIn: boolean;
};

export default function Header({ isLoggedIn }: HeaderProps) {
  const pathname = usePathname();
  const headerStyle = (pathname === '/ppa' || pathname === '/agreements') && 'text-white';
  const iconStyle =
    (pathname === '/ppa' || pathname === '/agreements') && 'filter invert brightness-0';

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header
      className={twMerge(
        'sticky top-0 z-50 flex h-[13.7rem] w-full items-center text-gray-black backdrop-blur-sm',
        headerStyle,
      )}
    >
      <h1 className="ml-[8rem] flex items-center">
        <Link href="/">
          <LogoIcon className={iconStyle} />
        </Link>
      </h1>
      <nav className="w-full px-[5rem]">
        <ul className="flex items-center justify-end space-x-[5rem]">
          <li>
            <Link
              href="/vulnerability-db?label=hot&page=1"
              className="text-[1.8rem] font-medium hover:text-primary-500"
            >
              취약점 DB
            </Link>
          </li>
          <li>
            <Link
              href="/repos"
              className="pr-[2rem] text-[1.8rem] font-medium hover:text-primary-500"
            >
              MY 저장소
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="text-[1.8rem] font-medium hover:text-red-500"
              >
                로그아웃
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
