import { NextApiRequest } from 'next';

export async function GET(request: NextApiRequest) {
  const res = await fetch('/media/t_list.asp');
  const html = await res.text();
  console.log(request);
  return Response.json({
    message: html,
    status: false,
  });
}
