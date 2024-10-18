import ReposSkeleton from '@/components/Skeleton/ReposSkeleton';
import { Suspense } from 'react';

export default function ReposLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<ReposSkeleton />}>{children}</Suspense>;
}
