import MePageTitle from '@/app/me/_components/MePageTitle';
import ScrapList from '@/app/me/_components/ScrapList';
import { authOptions } from '@/authOptions';
import { getServerSession } from 'next-auth';

export default async function ScrapsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/scrap?userId=${session?.user.id}`,
  );

  const { scrapData } = await response.json();

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center gap-[12.4rem]">
      <MePageTitle title="Clipping Article" />
      <ScrapList searchParams={searchParams} scrapData={scrapData} />
    </div>
  );
}
