import { NextResponse } from 'next/server';

import {
  deleteUserRepositories,
  getFirestoreRepos,
  saveRepository,
  updateBookmarkStatus,
  updateCheckedStatus,
} from '@/firebase/firebaseRepository';
import { getRepoList } from '@/apis/repository';

export async function POST(request: Request) {
  const { userId, userName } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'userId가 필요합니다.' }, { status: 400 });
  }

  try {
    const repos = await getRepoList(userName);
    await saveRepository(userId, repos);
    return NextResponse.json({ message: '레포지토리 정보가 성공적으로 저장되었습니다.' });
  } catch (error) {
    console.error('Error saving repositories:', error);
    return NextResponse.json({ error: '레포지토리 저장에 실패했습니다.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { userId, repoId, isBookmarked, isChecked } = await request.json();

  try {
    if (typeof isBookmarked !== 'undefined') {
      await updateBookmarkStatus(userId, repoId, isBookmarked);
    }
    if (typeof isChecked !== 'undefined') {
      await updateCheckedStatus(userId, repoId, isChecked);
    }
    return NextResponse.json({ message: '성공적으로 수정되었습니다.' });
  } catch (error) {
    return NextResponse.json({ error: '업데이트에 실패했습니다.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId가 필요합니다.' }, { status: 400 });
  }

  try {
    const bookmarkedRepos = await getFirestoreRepos(userId);

    if (!bookmarkedRepos || bookmarkedRepos.length === 0) {
      return NextResponse.json({ repositories: [] });
    }

    return NextResponse.json({ repositories: bookmarkedRepos });
  } catch (error) {
    console.error('GET 요청 처리 중 에러 발생:', error);
    return NextResponse.json({ error: '서버에서 에러가 발생했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'userId가 필요합니다.' }, { status: 400 });
  }
  try {
    await deleteUserRepositories(userId);
    return NextResponse.json({ message: '사용자 데이터가 성공적으로 삭제됐습니다.' });
  } catch (error) {
    return NextResponse.json({ error: '삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
