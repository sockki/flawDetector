const authUrl = 'http://43.203.238.76:8000/auth/token';
const authBody = {
  username: 'sfacspace_3',
  password: '3836734a5a59fb0c',
};

const getAuthToken = async () => {
  const response = await fetch(authUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(authBody),
  });

  if (!response.ok) {
    throw new Error('인증에러');
  }
  const data = await response.json();
  return data.access_token;
};

const generateUrl = 'http://43.203.238.76:8000/generate';

export const postMessage = async (inputMessage: string) => {
  const token = await getAuthToken();
  const response = await fetch(generateUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_message: inputMessage,
      temperature: 0.9,
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    throw new Error('메세지 전송 오류');
  }

  // const reader = response.body?.getReader();
  // const decoder = new TextDecoder('utf-8');

  // let result = '';

  // while (true) {
  //   const { value, done } = await reader.read();
  //   if (done) break;
  //   result += decoder.decode(value, { stream: true });
  // }

  // console.log(result);
  // return result;
};
