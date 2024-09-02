import { auth, db } from '@/firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ db, data: auth });
}

export async function POST(request: Request) {
  const { email, name } = await request.json();

  const userRef = doc(db, 'users', '1234');
  await setDoc(userRef, {
    uid: '1234',
    email,
    name,
  });

  return new Response(JSON.stringify({ message: '성공' }), {
    status: 200,
  });
}
