import { db } from '@/firebase/firebaseConfig';
import { fromUnixTime } from 'date-fns';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const articleId = searchParams.get('articleId');

    if (!userId) {
      return NextResponse.json({ error: 'userId가 누락되었습니다.' }, { status: 400 });
    }

    if (articleId) {
      const scrapDocRef = doc(db, `users/${userId}/scrap`, articleId);
      const scrapDoc = await getDoc(scrapDocRef);

      if (scrapDoc.exists()) {
        const data = scrapDoc.data();
        return NextResponse.json({ data });
      } else {
        return NextResponse.json({ data: { isScrapped: false } });
      }
    }
    const scrapCollectionRef = collection(db, `users/${userId}/scrap`);
    const scrapSnapshot = await getDocs(scrapCollectionRef);

    const scrapData = scrapSnapshot.docs.map(doc3 => ({
      id: doc3.id,
      label: 'report',
      date: fromUnixTime(doc3.data().scrappedAt.seconds),
      title: doc3.data().title,
    }));

    return NextResponse.json({ scrapData });
  } catch (error) {
    return NextResponse.json(
      { error: '스크랩 데이터를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId, articleId, title } = await request.json();

    const scrapDoc = doc(db, `users/${userId}/scrap`, articleId);
    await setDoc(scrapDoc, {
      isScrapped: true,
      scrappedAt: new Date(),
      articleId,
      title,
    });

    return NextResponse.json({ message: '기사가 스크랩 되었습니다.' });
  } catch (error) {
    return NextResponse.json({ error: '스크랩에 실패했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId, articleId } = await request.json();

    const scrapDoc = doc(db, `users/${userId}/scrap`, articleId);
    await deleteDoc(scrapDoc);

    return NextResponse.json({ message: '스크랩 목록에서 삭제했습니다.' });
  } catch (error) {
    return NextResponse.json({ error: '스크랩 삭제 실패' }, { status: 500 });
  }
}
