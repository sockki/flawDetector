import { NextApiRequest } from 'next';

export async function GET(request: NextApiRequest) {
  const res = await fetch('https://www.cnnvd.org.cn/home/warn');
  const html = await res.text();
  console.log(request, html);
  return '';
}
