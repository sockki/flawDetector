// /app/api/user-scraps/route.ts

import { authOptions } from '@/authOptions';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      // 사용자가 로그인하지 않은 경우 빈 배열 반환
      return NextResponse.json({ scraps: [], message: '실패' });
    }

    const scrapCollection = collection(db, 'users', userId.toString(), 'scrap');
    // const scrapCollection = collection(db, 'users', '132687752', 'scrap');
    const scrapDocs = await getDocs(scrapCollection);
    const scrappedArticleIds = scrapDocs.docs.map(doc => doc.id);
    console.log(scrapCollection);

    return NextResponse.json({ scraps: scrappedArticleIds });
  } catch (error) {
    console.error('API 오류 발생:', error);
    // 오류 발생 시에도 빈 배열 반환
    return NextResponse.json({ scraps: [] });
  }
}
