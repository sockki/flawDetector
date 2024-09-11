import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';
import ReposPageHeader from '@/app/repos/_components/ReposPageHeader';
import UserCard from '@/app/repos/_components/UserCard';
import RepositoryList from '@/app/repos/_components/RepositoryList';
import NonLoginReposPage from '@/app/repos/_components/NonLoginReposPage';

export default async function ReposPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const userName = session?.user.login;

  if (!session) {
    return <NonLoginReposPage />;
  }

  if (!session?.user) {
    return <div>Loading...</div>;
  }

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/repositories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, userName }),
  });

  const sortOption = searchParams.sortOption || '최신순';
  const query = `userId=${userId}&sortOption=${sortOption}`;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/repositories?${query}`);
  const data = await res.json();

  return (
    <div className="mx-auto bg-opacity-70 bg-[url('/images/headerBackground.svg')] bg-contain bg-top bg-no-repeat">
      <div className="mx-auto flex w-[131.4rem] min-w-[131.4rem] flex-col items-center gap-[12.4rem]">
        <ReposPageHeader />
        <div className="mb-[15rem] flex flex-col gap-[2.8rem]">
          <UserCard user={session.user} />
          <RepositoryList
            user={session.user}
            repositories={data.repositories}
            searchParams={searchParams}
          />
        </div>
      </div>
    </div>
  );
}
