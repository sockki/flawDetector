import Input from '@/components/Input/Input';

type UserInfoProps = {
  email: string;
};

export default function UserInfo({ email }: UserInfoProps) {
  return (
    <section className="flex w-full flex-col gap-[4.8rem] border-b border-b-[#e6e6e6] pb-[8rem]">
      <h3 className="text-[3.2rem] font-bold text-gray-black">내 정보</h3>
      <div className="flex flex-col gap-[1.6rem]">
        <p className="text-[2.4rem] font-regular text-gray-black">계정(깃허브 연동)</p>
        <Input disabled placeholder={email} />
      </div>
    </section>
  );
}
