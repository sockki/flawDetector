import { postGenerateMessage } from '@/apis/llama';
import { db } from '@/firebase/firebaseConfig';
import { checkAndUpdateScanStatus } from '@/firebase/firebaseRepository';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

async function saveResultToFirestore(
  userId: string,
  repoName: string,
  generatedResult: FileScanResult,
) {
  try {
    await addDoc(
      collection(db, 'users', userId.toString(), 'repositories', repoName, 'codeScanResult'),
      {
        result: generatedResult,
      },
    );

    const repoRef = doc(db, 'users', userId.toString(), 'repositories', repoName);
    await updateDoc(repoRef, { isChecked: 'under' });

    await checkAndUpdateScanStatus(userId, repoName, repoName);
  } catch (error) {
    console.error('Error saving to Firestore:', error);
    throw new Error('Firestore 저장 실패');
  }
}

export async function POST(request: Request) {
  try {
    const { prompt, userId, repoName } = await request.json();
    const generatedResult = await postGenerateMessage(prompt);

    await saveResultToFirestore(userId, repoName, JSON.parse(generatedResult));
    return NextResponse.json({ message: '성공적으로 저장되었습니다.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '메세지 생성 실패' }, { status: 500 });
  }
}
