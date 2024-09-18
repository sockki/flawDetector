import { db } from '@/firebase/firebaseConfig';
import { ApiResponse, CrawlingData } from '@/types/crawlingData';
import { collection, doc, getDocs, limit, orderBy, query, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const hotQuery = query(collection(db, 'vulDb'), orderBy('view', 'desc'), limit(10));
    const newQuery = query(collection(db, 'vulDb'), orderBy('scrapDate', 'desc'), limit(10));

    const hotResult = await getDocs(hotQuery);
    const newResult = await getDocs(newQuery);

    const hotId: string[] = [];
    const newId: string[] = [];

    const nowDate = Date.now();

    hotResult.docs.forEach(hotDocItem => hotId.push(hotDocItem.id));
    newResult.docs.forEach(newDocItem => {
      const data = newDocItem.data() as CrawlingData;
      if (Number(data.scrapDate) > nowDate - 48 * 60 * 60 * 1000) {
        newId.push(newDocItem.id);
      }
    });

    const labelRef = doc(db, 'label', 'vulDbId');
    updateDoc(labelRef, { hot: hotId, new: newId });

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      message: '라벨 목록 업데이트가 완료 되었습니다.',
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message, status: false });
    }
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    });
  }
}
