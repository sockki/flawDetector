import { getFileStatus } from '@/apis/repos/repository';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userName, repoName, userId }: { userName: string; repoName: string; userId: string } =
      await req.json();

    console.log(userId);

    if (!userName) {
      return NextResponse.json(
        { error: '유효한 userName 파라미터가 필요합니다.' },
        { status: 400 },
      );
    }
    if (!repoName) {
      return NextResponse.json(
        { error: '유효한 repoName 파라미터가 필요합니다.' },
        { status: 400 },
      );
    }

    if (!userId) {
      return NextResponse.json({ error: '유효한 userId 파라미터가 필요합니다.' }, { status: 400 });
    }

    const results = await getFileStatus({ userName, repoName, userId });
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
    return NextResponse.json(
      { error: '데이터를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
