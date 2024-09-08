import { create } from 'zustand';

import type { RepositoryState } from '@/types/repository';
import { loadRecentRepoFromLocalStorage } from '@/utils/localStorage';

export const useRepoStore = create<RepositoryState>(set => ({
  repositories: [],
  recentViewed: loadRecentRepoFromLocalStorage(),

  setRepositories: repos => set({ repositories: repos }),

  addRecentViewed: repo =>
    set(state => {
      const updatedRecentRepos = [repo, ...state.recentViewed.filter(r => r.id !== repo.id)].slice(
        0,
        20,
      );
      localStorage.setItem('recentRepos', JSON.stringify(updatedRecentRepos)); // localStorage에도 저장
      return { recentViewed: updatedRecentRepos };
    }),
}));
