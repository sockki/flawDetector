import MyPageTitle from '@/app/me/_components/MyPageTitle';
import UserCard from '@/app/repos/_components/UserCard';
import UserInfo from '@/app/me/_components/UserInfo';
import MyPageLinks from '@/app/me/_components/MyPageLinks';

export default function page() {
  const avatarUrl = '/images/AvatarDummyImg.png';
  const email = 'marry@gmail.com';

  return (
    <div className="mx-auto flex min-h-screen w-[131.4rem] flex-col items-center gap-[8.3rem]">
      <MyPageTitle title="Profile Information" />
      <UserCard avatar={avatarUrl} email={email} hasLogoutButton />
      <UserInfo email={email} />
      <MyPageLinks />
    </div>
  );
}
