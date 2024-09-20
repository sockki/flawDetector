import { NextResponse } from 'next/server';
import { getFirestoreRepositories } from '@/firebase/firebaseRepository';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId가 필요합니다.' }, { status: 400 });
  }

  try {
    const { repos } = await getFirestoreRepositories(userId, '최신순');
    return NextResponse.json({ repos });
  } catch (error) {
    console.error('레포지토리 상태 업데이트 실패', error);
    return NextResponse.json({ error: '서버에서 에러가 발생했습니다.' }, { status: 500 });
  }
}
