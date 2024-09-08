import { db } from '@/firebase/firebaseConfig';
import { ArticleData, CrawlingData } from '@/types/crawlingData';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const data: ArticleData[] = [];

    const vulDbQuery = query(collection(db, 'vulDb'), orderBy('uploadDate', 'desc'));

    const results = await getDocs(vulDbQuery);

    results.docs.slice((page - 1) * 5, page * 5).forEach(doc => {
      const docData = doc.data() as CrawlingData;
      data.push({ ...docData, id: doc.id });
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
