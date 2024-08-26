/* eslint-disable @typescript-eslint/naming-convention */
// app/api/generateMessage/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { user_message, temperature, top_p } = await request.json();

  // 토큰 발급
  const authResponse = await fetch('http://43.203.238.76:8000/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username: 'sfacspace_3',
      password: '3836734a5a59fb0c',
    }),
  });

  if (!authResponse.ok) {
    console.log(authResponse);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }

  const { access_token } = await authResponse.json();

  // LLaMA3 API 호출
  const generateResponse = await fetch('http://43.203.238.76:8000/generate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_message,
      temperature,
      top_p,
    }),
  });

  if (!generateResponse.ok) {
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }

  // const test = await generateResponse.json();
  const data = await generateResponse.text();
  console.log(generateResponse);
  return NextResponse.json(data);
}
