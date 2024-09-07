import type { Repository } from '@/app/repos/_components/RepositoryList';

export const saveRecentRepoToLocalStorage = (recentRepos: Repository[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('recentRepos', JSON.stringify(recentRepos));
  }
};

export const loadRecentRepoFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedRepos = localStorage.getItem('recentRepos');
    return storedRepos ? JSON.parse(storedRepos) : [];
  }
  return [];
};

export const addRecentViewedToLocalStorage = (repo: Repository) => {
  const recentRepos = loadRecentRepoFromLocalStorage();

  const updatedRecentRepos = [
    repo,
    ...recentRepos.filter((r: { id: string }) => r.id !== repo.id),
  ].slice(0, 20);
  saveRecentRepoToLocalStorage(updatedRecentRepos);
};
