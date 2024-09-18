import SortList from '@/app/repos/[userName]/[repoName]/_components/SortList';
import { DoubleCheckIcon, ListIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';

type ListHeaderProps = {
  onFileSelect?: () => void;
  onListClick: () => void;
  onChangeSortType: (type: string) => void;
  isSortOpen: boolean;
};

export function ListHeader({
  onFileSelect,
  isSortOpen,
  onListClick,
  onChangeSortType,
}: ListHeaderProps) {
  const containerStyles =
    'flex h-[7rem] w-[24.7rem] items-center justify-between rounded-t-[0.8rem] border-gray-300 bg-purple-light p-[2rem] relative';

  const iconContainerStyles = 'flex h-[3rem] w-fit items-center justify-around gap-[1rem] ';

  return (
    <div className={containerStyles}>
      <div className="text-[2rem]">Files</div>
      <div className={iconContainerStyles}>
        <DoubleCheckIcon
          onClick={onFileSelect}
          className="[&_*]:fill-primary-500, cursor-pointer"
        />
        <ListIcon onClick={onListClick} className="cursor-pointer" />
        <div
          className={twMerge(
            'absolute left-[11rem] top-[4.5rem] h-[28.5rem] w-[11.5rem] overflow-hidden rounded-[0.8rem]',
            isSortOpen ? '' : 'hidden',
          )}
        >
          {isSortOpen ? (
            <SortList onChangeSortType={onChangeSortType} onIsSortHandle={onListClick} />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
