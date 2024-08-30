import Link from 'next/link';

export default function MyPageLinks() {
  return (
    <section className="flex w-full flex-col gap-[3.6rem]">
      <Link href="/me/scraps" className="text-[2.4rem] font-medium text-gray-black">
        스크랩
      </Link>
      <Link href="/me/setting" className="text-[2.4rem] font-medium text-gray-black">
        설정
      </Link>
      <Link href="/me/contact" className="text-[2.4rem] font-medium text-gray-black">
        문의하기
      </Link>
    </section>
  );
}
