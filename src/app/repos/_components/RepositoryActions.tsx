import { FolderSimpleStarIcon, ClockCounterIcon } from '@/public/index';

export default function RepositoryActions() {
  return (
    <section className="flex w-full gap-[2rem]">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-[1rem] rounded-[1.2rem] border border-neutral-10 bg-white p-[1.6rem] text-[2rem] font-medium text-gray-black"
      >
        <ClockCounterIcon />
        Recents File
      </button>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-[1rem] rounded-[1.2rem] border border-neutral-10 bg-white p-[1.6rem] text-[2rem] font-medium text-gray-black"
      >
        <FolderSimpleStarIcon />
        Bookmarks
      </button>
    </section>
  );
}
