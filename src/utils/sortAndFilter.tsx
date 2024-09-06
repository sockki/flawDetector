import type { Repository } from '@/app/repos/_components/RepositoryList';

type SortAndFilterRepositoriesProps = {
  repositories: Repository[];
  typeFilter?: '검사완료' | '검사중';
  sortOption?: '최신순' | '오래된순' | '이름순';
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
      new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    오래된순: (a: Repository, b: Repository) =>
      new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime(),
    이름순: (a: Repository, b: Repository) => a.name.localeCompare(b.name),
  };

  if (sortOption && sortFunctions[sortOption]) {
    filteredRepos = filteredRepos.sort(sortFunctions[sortOption]);
  }

  return filteredRepos;
}
