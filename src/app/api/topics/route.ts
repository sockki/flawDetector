import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const topTopicsSort = query(collection(db, 'topic'), orderBy('count', 'desc'), limit(10));

    const dataSnap = await getDocs(topTopicsSort);

    const topTopics = dataSnap.docs.map(doc => ({
      topic: doc.id,
    }));

    return NextResponse.json(topTopics);
  } catch (error) {
    return NextResponse.json({ message: '토픽을 가져오는데 실패 했습니다.' }, { status: 500 });
  }
}
