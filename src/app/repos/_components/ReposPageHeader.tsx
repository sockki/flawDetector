import Link from 'next/link';

export default function ReposPageHeader() {
  return (
    <div className="flex flex-col items-center gap-[2rem]">
      <h2 className="text-[6rem] font-[300] text-primary-500">containing code files</h2>
      <Link
        href="/repos"
        className="flex h-[11rem] items-center gap-[1rem] rounded-full border-[0.4rem] border-primary-500 bg-white px-[4rem] text-center text-[6rem] text-primary-500"
      >
        My Library
      </Link>
    </div>
  );
}
