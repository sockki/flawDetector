import { ReactNode } from 'react';
import { RepoSide } from './_components/RepoSide';
import { Title } from './_components/Title';

interface LayoutProps {
  children: ReactNode;
  params: { userName: string; repoName: string };
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <div className="flex justify-center">
      <div className="relative flex w-fit flex-col items-center justify-center gap-[2.0rem]">
        <Title />
        <div className="flex gap-[2.8rem]">
          <RepoSide params={params} />
          {children}
        </div>
      </div>
    </div>
  );
}
