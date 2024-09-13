import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `[FlawDetector] ${name}님 문의사항`,
      text: message,
    });

    return NextResponse.json({ message: '이메일이 성공적으로 전송되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('이메일 전송 중 오류가 발생했습니다.', error);
    return NextResponse.json({ message: '이메일 전송에 실패했습니다.' }, { status: 500 });
  }
}
