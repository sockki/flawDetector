import { DetectFileLabelType } from '@/types/detectedFileCard';

export type BaseRepoData = {
  id: string;
  name: string;
  isChecked: DetectFileLabelType;
};

export type GitHubRepoData = BaseRepoData & {
  pushed_at: Date;
};

export type Repository = BaseRepoData & {
  pushedAt: Date;
  isBookmarked: boolean;
};

export type RepositoryState = {
  repositories: Repository[];
  recentViewed: Repository[];
  setRepositories: (repos: Repository[]) => void;
  addRecentViewed: (repo: Repository) => void;
};
