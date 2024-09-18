import { getLabelData } from '@/apis/vulDb/getLabelData';
import { db } from '@/firebase/firebaseConfig';
import { LabelType } from '@/types/articleCard';
import { ApiResponse, ArticleData, CrawlingData, GetLabelData } from '@/types/crawlingData';
import { collection, doc, getDocs, orderBy, query, runTransaction } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const label = searchParams.get('label');
    const search = searchParams.get('search');
    const userId = searchParams.get('userId');
    const data: ArticleData[] = [];

    const vulDbQuery = query(
      collection(db, 'vulDb'),
      orderBy(label === 'new' ? 'scrapDate' : 'view', 'desc'),
    );

    const crawlingSnapshots = await getDocs(vulDbQuery);

    const scrappedArticleIds: string[] = [];
    if (userId) {
      const scrapCollection = collection(db, 'users', userId.toString(), 'scrap');
      const scrapDocs = await getDocs(scrapCollection);
      scrappedArticleIds.push(...scrapDocs.docs.map(docItem => docItem.id));
    }

    const { hotIdSet, newIdSet }: GetLabelData = await getLabelData();

    let filteredDocs = crawlingSnapshots.docs;

    if (search) {
      filteredDocs = crawlingSnapshots.docs.filter(crawlingDocItem => {
        const docData = crawlingDocItem.data() as CrawlingData;
        return docData.title.toLowerCase().includes(search.toLowerCase());
      });
    }
    if (filteredDocs.length === 0) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        message: '취약점DB에 검색한 결과가 없어요.',
        subMessage: '다른 주제로 다시 검색해 보세요',
      });
    }

    filteredDocs.slice((page - 1) * 5, page * 5).forEach(filteredDocItem => {
      const crawlingDocData = filteredDocItem.data() as CrawlingData;
      const crawlingLabel: LabelType[] = [];
      if (hotIdSet.has(filteredDocItem.id)) {
        crawlingLabel.push('hot');
      }
      if (newIdSet.has(filteredDocItem.id)) {
        crawlingLabel.push('new');
      }
      data.push({
        ...crawlingDocData,
        id: filteredDocItem.id,
        labelList: crawlingLabel,
        isScrapped: scrappedArticleIds.includes(filteredDocItem.id),
      });
    });

    return NextResponse.json<ApiResponse<ArticleData[]>>({
      success: true,
      data,
      totalLength: filteredDocs.length,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
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

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      message: '조회수 처리가 완료 되었습니다.',
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    });
  }
}
