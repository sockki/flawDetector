import { db } from '@/firebase/firebaseConfig';
import { CrawlingData } from '@/types/crawlingData';
import { doc, getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const articleRef = doc(db, 'vulDb', params.id);
    const articleSnap = await getDoc(articleRef);

    if (!articleSnap.exists()) {
      return NextResponse.json({ message: '데이터가 존재하지 않습니다' }, { status: 404 });
    }

    const articleDetailData = { ...(articleSnap.data() as CrawlingData), id: params.id };
    return NextResponse.json(articleDetailData);
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
