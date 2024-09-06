import { db } from '@/firebase/firebaseConfig';
import { doc, runTransaction } from 'firebase/firestore';

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
