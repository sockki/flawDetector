import { getRepoContents } from '@/apis/repos/repository';

export const countRepoFiles = async (
  owner: string,
  repo: string,
  path: string,
): Promise<number> => {
  try {
    const contents = await getRepoContents({ owner, repo, path });

    if (!contents || !Array.isArray(contents)) {
      return 0;
    }

    const fileCounts = await Promise.all(
      contents.map(async item => {
        if (item.type === 'dir') {
          return countRepoFiles(owner, repo, item.path);
        } else if (item.type === 'file') {
          return 1;
        }
        return 0;
      }),
    );
    return fileCounts.reduce((total, count) => total + count, 0);
  } catch (error) {
    console.error('파일 개수 계산 중 오류 발생', error);
    return 0;
  }
};
