import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';
import MePageTitle from '@/app/me/_components/MePageTitle';
import UserCard from '@/app/repos/_components/UserCard';
import UserInfo from '@/app/me/_components/UserInfo';
import MePageLinks from '@/app/me/_components/MePageLinks';

export default async function MePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto mb-[10rem] flex min-h-screen w-[131.4rem] flex-col items-center gap-[8.3rem]">
      <MePageTitle title="Profile Information" />
      <UserCard user={session.user} hasLogoutButton />
      <UserInfo />
      <MePageLinks />
    </div>
  );
}
