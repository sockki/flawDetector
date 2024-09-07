import type { Repository } from '@/app/repos/_components/RepositoryList';

export const saveRecentRepoToLocalStorage = (recentRepos: Repository[]) => {
  localStorage.setItem('recentRepos', JSON.stringify(recentRepos));
};

export const loadRecentRepoFromLocalStorage = () => {
  const storedRepos = localStorage.getItem('recentRepos');
  return storedRepos ? JSON.parse(storedRepos) : [];
};

export const addRecentViewedToLocalStorage = (repo: Repository) => {
  const recentRepos = loadRecentRepoFromLocalStorage();

  const updatedRecentRepos = [
    repo,
    ...recentRepos.filter((r: { id: string }) => r.id !== repo.id),
  ].slice(0, 20);
  saveRecentRepoToLocalStorage(updatedRecentRepos);
};
