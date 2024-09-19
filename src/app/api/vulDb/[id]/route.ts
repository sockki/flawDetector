import { getLabelData } from '@/apis/vulDb/getLabelData';
import { db } from '@/firebase/firebaseConfig';
import { LabelType } from '@/types/articleCard';
import { ArticleData, CrawlingData, GetLabelData } from '@/types/crawlingData';
import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
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
      view: 0,
      labelList: [],
      company: '',
      isScrapped: false,
    };

    const relativeData: ArticleData[] = [];

    const articleRef = doc(db, 'vulDb', params.id);
    const articleSnapshot = await getDoc(articleRef);

    const { hotIdSet, newIdSet }: GetLabelData = await getLabelData();

    if (articleSnapshot.exists()) {
      const articleLabel: LabelType[] = [];
      if (hotIdSet.has(params.id)) {
        articleLabel.push('hot');
      }
      if (newIdSet.has(params.id)) {
        articleLabel.push('new');
      }
      articleDetailData = {
        ...(articleSnapshot.data() as CrawlingData),
        id: params.id,
        labelList: articleLabel,
      };

      const relativeQuery = query(
        collection(db, 'vulDb'),
        where('company', '==', articleDetailData.company),
        limit(6),
      );

      const relativeSnapshots = await getDocs(relativeQuery);

      relativeSnapshots.docs.forEach(relativeDocItem => {
        const relativeDocData = relativeDocItem.data() as CrawlingData;
        if (params.id === relativeDocItem.id) return;
        const relativeLabel: LabelType[] = [];
        if (hotIdSet.has(params.id)) {
          relativeLabel.push('hot');
        }
        if (newIdSet.has(params.id)) {
          relativeLabel.push('new');
        }
        relativeData.push({ ...relativeDocData, id: relativeDocItem.id, labelList: relativeLabel });
      });

      return NextResponse.json({ articleDetailData, relativeData });
    } else {
      return NextResponse.json({ message: '데이터가 존재하지 않습니다' }, { status: 500 });
    }
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
