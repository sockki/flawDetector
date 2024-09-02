import Link from 'next/link';

export default function MePageLinks() {
  const links = [
    { href: '/me/scraps', label: '스크랩' },
    { href: '/me/setting', label: '설정' },
    { href: '/me/contact', label: '문의하기' },
  ];

  return (
    <section className="flex w-full flex-col gap-[3.6rem]">
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className="text-[2.4rem] font-medium text-gray-black">
          {label}
        </Link>
      ))}
    </section>
  );
}
