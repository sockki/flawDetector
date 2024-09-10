import { NextResponse } from 'next/server';

import {
  deleteUserRepositories,
  getFirestoreRepos,
  saveRepository,
  updateBookmarkStatus,
  updateCheckedStatus,
} from '@/firebase/firebaseRepository';
import { getRepoList } from '@/apis/repository';
import { SortOption } from '@/types/sortAndFilter';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get('userName');
  const sortOption = (searchParams.get('sortOption') as SortOption) || '최신순';

  if (!userName) {
    return NextResponse.json({ error: 'userName이 필요합니다.' }, { status: 400 });
  }

  try {
    const { repos } = await getFirestoreRepositories(userName, sortOption);
    return NextResponse.json({ repositories: repos });
  } catch (error) {
    console.error('GET 요청 처리 중 에러 발생:', error);
    return NextResponse.json({ error: '서버에서 에러가 발생했습니다.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userName } = await request.json();

  if (!userName) {
    return NextResponse.json({ error: 'userName이 필요합니다.' }, { status: 400 });
  }

  try {
    const repos = await getRepoList(userName);
    await saveRepositories(userName, repos);
    return NextResponse.json({ message: '레포지토리 정보가 성공적으로 저장되었습니다.' });
  } catch (error) {
    console.error('Error saving repositories:', error);
    return NextResponse.json({ error: '레포지토리 저장에 실패했습니다.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { userName, repoId, isBookmarked, isChecked } = await request.json();

  try {
    if (typeof isBookmarked !== 'undefined') {
      await updateBookmarkStatus(userName, repoId, isBookmarked);
    }
    if (typeof isChecked !== 'undefined') {
      await updateCheckedStatus(userName, repoId, isChecked);
    }
    return NextResponse.json({ message: '성공적으로 수정되었습니다.' });
  } catch (error) {
    return NextResponse.json({ error: '업데이트에 실패했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { userName } = await request.json();

  if (!userName) {
    return NextResponse.json({ error: 'userName이 필요합니다.' }, { status: 400 });
  }

  try {
    await deleteUserRepositories(userName);
    return NextResponse.json({ message: '사용자 데이터가 성공적으로 삭제됐습니다.' });
  } catch (error) {
    return NextResponse.json({ error: '삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
