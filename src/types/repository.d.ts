import { DetectFileLabelType } from './detectedFileCard';

export type Repository = {
  id: string;
  name: string;
  pushed_at: Date;
  isBookmarked: boolean;
  isChecked: DetectFileLabelType;
};

export type RepositoryState = {
  repositories: Repository[];
  recentViewed: Repository[];
  setRepositories: (repos: Repository[]) => void;
  addRecentViewed: (repo: Repository) => void;
};
