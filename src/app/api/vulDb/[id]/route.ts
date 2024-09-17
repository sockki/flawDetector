import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Firestore 문서를 가져오는 공통 함수
async function getArticleData(id: string) {
  const articleRef = doc(db, 'vulDb', id);
  const articleSnap = await getDoc(articleRef);

  if (!articleSnap.exists()) {
    return null;
  }

  return articleSnap.data();
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const articleData = await getArticleData(params.id);

    if (!articleData) {
      return NextResponse.json({ message: '데이터가 존재하지 않습니다' }, { status: 404 });
    }

    return NextResponse.json({ ...articleData, id: params.id });
  } catch (error) {
    return NextResponse.json({
      message:
        error instanceof Error
          ? error.message
          : '취약점 db 디테일을 가져오는데 오류가 발생했습니다.',
      status: false,
    });
  }
}
