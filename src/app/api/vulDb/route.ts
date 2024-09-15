import { db } from '@/firebase/firebaseConfig';
import { ArticleData, CrawlingData } from '@/types/crawlingData';
import { collection, doc, getDocs, orderBy, query, runTransaction } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const label = searchParams.get('label');
    const data: ArticleData[] = [];

    let vulDbQuery = query(collection(db, 'vulDb'), orderBy('view', 'desc'));
    if (label === 'new') {
      vulDbQuery = query(collection(db, 'vulDb'), orderBy('scrapDate', 'desc'));
    }
    if (label === 'hot') {
      vulDbQuery = query(collection(db, 'vulDb'), orderBy('view', 'desc'));
    }

    const results = await getDocs(vulDbQuery);

    results.docs.slice((page - 1) * 5, page * 5).forEach(docItem => {
      const docData = docItem.data() as CrawlingData;
      data.push({ ...docData, id: docItem.id });
    });

    return NextResponse.json({ data, totalLength: results.size });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message, status: false });
    }
    return Response.json({
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
      return Response.json({ message: error.message, status: false });
    }
    return Response.json({
      message: '알 수 없는 오류가 발생했습니다.',
      status: false,
    });
  }
}

/* async function getLabel() {
  const hotQuery = query(collection(db, 'vulDb'), orderBy('view', 'desc'), limit(10));
  const newQuery = query(collection(db, 'vulDb'), orderBy('scrapDate', 'desc'), limit(10));

  const hotResult = await getDocs(hotQuery);
  const newResult = await getDocs(newQuery);
} */
