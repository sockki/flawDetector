'use client';

import { useRepoStore } from '@/stores/useRepoStore';
import { FolderSimpleStarIcon, ClockCounterIcon } from '@/public/index';
import { Repository } from '@/types/repository';

export default function RepositoryActions() {
  const { repositories, recentViewed, setFilteredRepositories, filterType, setFilterType } =
    useRepoStore();

  const updateFilteredRepositories = (
    newFilterType: 'all' | 'recent' | 'bookmark',
    filteredData: Repository[],
  ) => {
    setFilteredRepositories(filterType === newFilterType ? [...repositories] : [...filteredData]);
    setFilterType(filterType === newFilterType ? 'all' : newFilterType);
  };

  const handleRecentsButton = () => {
    updateFilteredRepositories('recent', recentViewed);
  };

  const handleBookmarksButton = () => {
    const bookmarkRepos = repositories.filter(repo => repo.isBookmarked === true);
    updateFilteredRepositories('bookmark', bookmarkRepos);
  };

  return (
    <section className="flex w-full gap-[2rem]">
      <button
        type="button"
        onClick={handleRecentsButton}
        className="flex w-full items-center justify-center gap-[1rem] rounded-[1.2rem] border border-neutral-10 bg-white p-[1.6rem] text-[2rem] font-medium text-gray-black"
      >
        <ClockCounterIcon />
        Recents File
      </button>
      <button
        type="button"
        onClick={handleBookmarksButton}
        className="flex w-full items-center justify-center gap-[1rem] rounded-[1.2rem] border border-neutral-10 bg-white p-[1.6rem] text-[2rem] font-medium text-gray-black"
      >
        <FolderSimpleStarIcon />
        Bookmarks
      </button>
    </section>
  );
}
