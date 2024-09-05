import { postGenerateMessage } from '@/apis/llama';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    const generatedMessage = await postGenerateMessage(prompt);

    return NextResponse.json({ message: generatedMessage });
  } catch (error) {
    return NextResponse.json({ error: '메세지 생성 실패' }, { status: 500 });
  }
}
