import { NextResponse } from 'next/server';

type GetRepoItemsProps = {
  userName: string;
  repoName: string;
  path?: string;
};

export async function getRepoItems({ userName, repoName, path = '' }: GetRepoItemsProps) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${userName}/${repoName}/contents/${path}`,
    );

    if (!res.ok) {
      throw new Error(`레포지토리를 가져오는데 실패하였습니다: ${res.status} ${res.statusText}`);
    }

    const repoItems = await res.json();

    const plainItems = new NextResponse(repoItems);

    return plainItems;
  } catch (error) {
    console.error('레포지토리를 가져오는 중 에러가 발생했습니다.', error);
    return null;
  }
}
