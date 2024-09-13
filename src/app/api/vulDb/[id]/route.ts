import { db } from '@/firebase/firebaseConfig';
import { ArticleData, CrawlingData } from '@/types/crawlingData';
import { doc, getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    let articleDetailData: ArticleData = {
      id: '',
      title: '',
      keyword: '',
      uploadDate: {
        seconds: 0,
        nanoseconds: 0,
      },
      scrapDate: new Date(0),
      content: [],
      views: 0,
    };
    const articleRef = doc(db, 'vulDb', params.id);
    const articleSnap = await getDoc(articleRef);

    if (articleSnap.exists()) {
      articleDetailData = { ...(articleSnap.data() as CrawlingData), id: params.id };
      return NextResponse.json(articleDetailData);
    } else {
      return NextResponse.json({ message: '데이터가 존재하지 않습니다' }, { status: 500 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message, status: false });
    }
  }
}
