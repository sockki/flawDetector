import { LogoIcon } from '@/public/index';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-[13.7rem] w-full items-center backdrop-blur-sm">
      <h1 className="text- ml-[8rem] flex items-center">
        <Link href="/">
          <LogoIcon />
        </Link>
      </h1>
      <nav className="w-full">
        <ul className="flex items-center justify-between">
          <li className="ml-[10rem]">
            <Link
              href="/vulnerability-db?page=1"
              className="text-[1.8rem] font-[500] text-gray-black"
            >
              취약점 DB
            </Link>
          </li>
          <li className="mr-[8rem]">
            <Link href="/repos" className="text-[1.8rem] font-[500] text-gray-black">
              MY 저장소
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
