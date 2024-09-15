import { db } from '@/firebase/firebaseConfig';
import { ArticleData, CrawlingData } from '@/types/crawlingData';
import { collection, doc, getDocs, orderBy, query, runTransaction } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const label = searchParams.get('label');
    const userId = searchParams.get('userId');
    const data: ArticleData[] = [];

    let vulDbQuery = query(collection(db, 'vulDb'), orderBy('view', 'desc'));
    if (label === 'new') {
      vulDbQuery = query(collection(db, 'vulDb'), orderBy('scrapDate', 'desc'));
    }
    if (label === 'hot') {
      vulDbQuery = query(collection(db, 'vulDb'), orderBy('view', 'desc'));
    }

    const results = await getDocs(vulDbQuery);

    const scrappedArticleIds: string[] = [];
    if (userId) {
      const scrapCollection = collection(db, 'users', userId.toString(), 'scrap');
      const scrapDocs = await getDocs(scrapCollection);
      scrappedArticleIds.push(...scrapDocs.docs.map(doc => doc.id));
    }

    results.docs.slice((page - 1) * 5, page * 5).forEach(doc => {
      const docData = doc.data() as CrawlingData;
      data.push({
        ...docData,
        id: doc.id,
        isScrapped: scrappedArticleIds.includes(doc.id), // 스크랩 여부 추가
      });
    });

    return NextResponse.json({ data, totalLength: results.size });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: false });
    }
    return NextResponse.json({
      message: '알 수 없는 오류가 발생했습니다.',
      status: false,
    });
  }
}

export async function POST(request: Request) {
  const { id } = await request.json();

  try {
    const articleRef = doc(db, 'vulDb', id);
    await runTransaction(db, async transaction => {
      const docSnapshot = await transaction.get(articleRef);
      const currentView = docSnapshot.data()?.view || 0;
      transaction.update(articleRef, { view: currentView + 1 });
    });

    return new Response(JSON.stringify({ message: '성공' }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: false });
    }
    return NextResponse.json({
      message: '알 수 없는 오류가 발생했습니다.',
      status: false,
    });
  }
}


