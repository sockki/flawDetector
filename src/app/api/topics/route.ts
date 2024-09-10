import { db } from '@/firebase/firebaseConfig';
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const topTopicsSort = query(collection(db, 'topic'), orderBy('count', 'desc'), limit(10));

    const dataSnap = await getDocs(topTopicsSort);

    const topTopics = dataSnap.docs.map(docData => ({
      topic: docData.id,
    }));

    return NextResponse.json(topTopics);
  } catch (error) {
    return NextResponse.json({ message: '토픽을 가져오는데 실패 했습니다.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { value } = await request.json();

  const topicRef = doc(db, 'topic', value);

  try {
    await runTransaction(db, async transaction => {
      const docSnapshot = await transaction.get(topicRef);

      if (!docSnapshot.exists()) {
        transaction.set(topicRef, { count: 1 });
        return;
      }

      const currentCount = docSnapshot.data()?.count || 0;
      transaction.update(topicRef, { count: currentCount + 1 });
    });

    return new Response(JSON.stringify({ message: '성공' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: '오류가 발생했습니다.' }), {
      status: 500,
    });
  }
}
