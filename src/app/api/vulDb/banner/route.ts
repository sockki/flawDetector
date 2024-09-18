import { db } from '@/firebase/firebaseConfig';
import { ApiResponse, ArticleData, CrawlingData } from '@/types/crawlingData';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data: ArticleData[] = [];

    const bannerQuery = query(collection(db, 'vulDb'), orderBy('scrapDate', 'desc'), limit(3));

    const bannerSnapshots = await getDocs(bannerQuery);

    bannerSnapshots.docs.forEach(bannerDocItem => {
      const bannerDocData = bannerDocItem.data() as CrawlingData;

      data.push({ ...bannerDocData, id: bannerDocItem.id, labelList: ['new'] });
    });

    return NextResponse.json<ApiResponse<ArticleData[]>>({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    });
  }
}
