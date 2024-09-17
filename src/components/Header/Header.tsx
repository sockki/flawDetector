'use client';

import { LogoIcon } from '@/public/index';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function Header() {
  const pathname = usePathname();
  const headerStyle = (pathname === '/ppa' || pathname === '/agreements') && 'text-white';
  const iconStyle =
    (pathname === '/ppa' || pathname === '/agreements') && 'filter invert brightness-0';

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
              className="text-[1.8rem] font-[500] hover:text-primary-500"
            >
              취약점 DB
            </Link>
          </li>
          <li>
            <Link
              href="/repos"
              className="pr-[2rem] text-[1.8rem] font-[500] hover:text-primary-500"
            >
              MY 저장소
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
