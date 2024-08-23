import { Title } from './_components/Title';

type CodeListLayoutProps = {
  children: React.ReactNode;
};

export default function CodeListLayout({ children }: CodeListLayoutProps) {
  return (
    <div className="relative left-[8rem] h-[160.3rem] w-[176.1rem]">
      <Title repoName="sfacweb-1" />
      {children}
    </div>
  );
}
