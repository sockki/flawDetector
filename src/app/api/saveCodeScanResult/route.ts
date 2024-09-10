import { postGenerateMessage } from '@/apis/llama';
import { db } from '@/firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { NextResponse } from 'next/server';

async function saveResultToFirestore(generatedResult: FileScanResult) {
  try {
    await addDoc(collection(db, 'codeScanResult'), {
      result: generatedResult,
    });
  } catch (error) {
    console.error('Error saving to Firestore:', error);
    throw new Error('Firestore 저장 실패');
  }
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    const generatedResult = await postGenerateMessage(prompt);

    await saveResultToFirestore(JSON.parse(generatedResult));
    return NextResponse.json({ message: '성공적으로 저장되었습니다.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '메세지 생성 실패' }, { status: 500 });
  }
}
