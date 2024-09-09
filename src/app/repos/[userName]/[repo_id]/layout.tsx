import { Title } from './_components/Title';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative left-[8rem] flex h-[147.1rem] w-[176.05rem] flex-col gap-[2.0rem]">
      <Title />
      {children}
    </div>
  );
}
