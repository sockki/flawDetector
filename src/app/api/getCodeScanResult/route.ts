import { NextResponse } from 'next/server';
import { getCodeScanResult } from '@/apis/repos/repository';

// POST 요청 핸들러
export async function POST(req: Request) {
  try {
    const { path } = await req.json();

    if (!path || typeof path !== 'string') {
      return NextResponse.json({ error: '유효한 path 파라미터가 필요합니다.' }, { status: 400 });
    }

    const results = await getCodeScanResult(path);
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
    return NextResponse.json(
      { error: '데이터를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
