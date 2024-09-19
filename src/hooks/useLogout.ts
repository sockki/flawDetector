'use client';

import { signOut } from 'next-auth/react';

export const useLogout = () => {
  const handleLogout = async (userId: string | undefined) => {
    try {
      const res = await fetch('/api/repositories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        throw new Error('사용자 데이터를 삭제하는 중 오류가 발생했습니다.');
      }

      if (typeof window !== 'undefined') {
        localStorage.removeItem('recentRepos');
      }

      await signOut({ callbackUrl: '/' });
    } catch (err) {
      console.error(err);
    }
  };
  return { handleLogout };
};
