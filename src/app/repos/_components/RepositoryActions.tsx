'use client';

import { useState } from 'react';
import { useRepoStore } from '@/stores/useRepoStore';
import { FolderSimpleStarIcon, ClockCounterIcon, ReturnArrowIcon } from '@/public/index';
import { Repository } from '@/types/repository';

export default function RepositoryActions() {
  const { repositories, recentViewed, setFilteredRepositories, filterType, setFilterType } =
    useRepoStore();
  const [activeButton, setActiveButton] = useState<'recent' | 'bookmark' | null>(null);

  const updateFilteredRepositories = (
    newFilterType: 'all' | 'recent' | 'bookmark',
    filteredData: Repository[],
  ) => {
    setFilteredRepositories(filterType === newFilterType ? [...repositories] : [...filteredData]);
    setFilterType(filterType === newFilterType ? 'all' : newFilterType);
  };

  const handleRecentsButton = () => {
    setActiveButton(activeButton === 'recent' ? null : 'recent');
    updateFilteredRepositories('recent', recentViewed);
  };

  const handleBookmarksButton = () => {
    setActiveButton(activeButton === 'bookmark' ? null : 'bookmark');
    const bookmarkRepos = repositories.filter(repo => repo.isBookmarked === true);
    updateFilteredRepositories('bookmark', bookmarkRepos);
  };

  return (
    <section className="flex w-full gap-[2rem]">
      <button
        type="button"
        onClick={handleRecentsButton}
        className={`group flex w-full items-center justify-center gap-[1rem] rounded-[1.2rem] border p-[1.6rem] text-[2rem] font-medium hover:bg-purple-light hover:text-primary-400 ${activeButton === 'recent' ? 'border-primary-100 bg-purple-light text-primary-400' : 'bg-white text-gray-black'}`}
      >
        {activeButton === 'recent' ? (
          <ReturnArrowIcon className="h-12 w-12 fill-primary-400" />
        ) : (
          <ClockCounterIcon className="fill-black group-hover:fill-primary-400" />
        )}
        {activeButton === 'recent' ? '전체 보기' : 'Recents File'}
      </button>
      <button
        type="button"
        onClick={handleBookmarksButton}
        className={`group flex w-full items-center justify-center gap-[1rem] rounded-[1.2rem] border p-[1.6rem] text-[2rem] font-medium hover:bg-purple-light hover:text-primary-400 ${activeButton === 'bookmark' ? 'border-primary-100 bg-purple-light text-primary-400' : 'bg-white text-gray-black'}`}
      >
        {activeButton === 'bookmark' ? (
          <ReturnArrowIcon className="h-12 w-12 fill-primary-400" />
        ) : (
          <FolderSimpleStarIcon className="fill-black group-hover:fill-primary-400" />
        )}

        {activeButton === 'bookmark' ? '전체 보기' : 'Bookmarks'}
      </button>
    </section>
  );
}
