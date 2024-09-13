import MePageTitle from '@/app/me/_components/MePageTitle';
import UserCard from '@/app/repos/_components/UserCard';
import UserSetting from '@/app/me/_components/UserSetting';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';

export default async function SettingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto flex min-h-screen w-[131.4rem] flex-col items-center gap-[12.4rem]">
      <MePageTitle title="Setting" />
      <div className="flex w-full flex-col gap-[7.1rem]">
        <UserCard user={session.user} hasLogoutButton />
        <UserSetting />
      </div>
    </div>
  );
}
