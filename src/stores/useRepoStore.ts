import { create } from 'zustand';
import type { RepositoryState } from '@/types/repository';
import { getRecentRepoFromLocalStorage } from '@/utils/localStorage';

export const useRepoStore = create<RepositoryState>(set => ({
  repositories: [],
  filteredRepositories: [],
  recentViewed: getRecentRepoFromLocalStorage(),
  filterType: 'all',

  setFilterType: filter => set({ filterType: filter }),
  setRepositories: repos => set({ repositories: repos }),
  setFilteredRepositories: repos => set({ filteredRepositories: repos }),
  addRecentViewed: repo =>
    set(state => {
      const updatedRecentRepos = [repo, ...state.recentViewed.filter(r => r.id !== repo.id)].slice(
        0,
        20,
      );
      localStorage.setItem('recentRepos', JSON.stringify(updatedRecentRepos));
      return { recentViewed: updatedRecentRepos };
    }),
}));
