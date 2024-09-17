import { db } from '@/firebase/firebaseConfig';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const articleId = searchParams.get('articleId');

    if (!userId || !articleId) {
      return NextResponse.json(
        { error: 'userId 또는 articleId가 누락되었습니다.' },
        { status: 400 },
      );
    }

    const scrapDocRef = doc(db, `users/${userId}/scrap`, articleId);
    const scrapDoc = await getDoc(scrapDocRef);

    if (scrapDoc.exists()) {
      const data = scrapDoc.data();
      return NextResponse.json({ isScrapped: data?.isScrapped || false });
    } else {
      return NextResponse.json({ isScrapped: false });
    }
  } catch (error) {
    return NextResponse.json(
      { error: '스크랩 상태를 확인하는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId, articleId } = await request.json();

    const scrapDoc = doc(db, `users/${userId}/scrap`, articleId);
    await setDoc(scrapDoc, {
      scrappedAt: new Date(),
      isScrapped: true,
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
