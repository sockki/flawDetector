import { Repository } from '@/types/repository';
import type { SortOption, TypeFilterOption } from '@/types/sortAndFilter';

type SortAndFilterRepositoriesProps = {
  repositories: Repository[];
  typeFilter?: TypeFilterOption;
  sortOption?: SortOption;
};

export default function sortAndFilterRepositories({
  repositories,
  typeFilter,
  sortOption,
}: SortAndFilterRepositoriesProps) {
  let filteredRepos = repositories;
  if (typeFilter) {
    const statusMap = {
      검사완료: 'done',
      검사중: 'under',
    };
    filteredRepos = repositories.filter(repo => repo.isChecked === statusMap[typeFilter]);
  }

  const sortFunctions = {
    최신순: (a: Repository, b: Repository) =>
      new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime(),
    오래된순: (a: Repository, b: Repository) =>
      new Date(a.pushedAt).getTime() - new Date(b.pushedAt).getTime(),
    이름순: (a: Repository, b: Repository) => a.name.localeCompare(b.name),
  };

  if (sortOption && sortFunctions[sortOption]) {
    filteredRepos = filteredRepos.sort(sortFunctions[sortOption]);
  }

  return filteredRepos;
}
