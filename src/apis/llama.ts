async function getAuthToken() {
  const authUrl = process.env.AUTH_URL;
  const username = process.env.AUTH_USERNAME;
  const password = process.env.AUTH_PASSWORD;

  if (!authUrl) {
    throw new Error('url이 정의되지 않았습니다.');
  }

  if (!username) {
    throw new Error('사용자 이름이 정의되지 않았습니다.');
  }

  if (!password) {
    throw new Error('비밀번호가 정의되지 않았습니다.');
  }

  const authBody = new URLSearchParams({
    username,
    password,
  });

  const response = await fetch(authUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: authBody,
  });

  if (!response.ok) {
    throw new Error('라마인증에러');
  }

  const { access_token: accessToken } = await response.json();
  return accessToken;
}

export async function postGenerateMessage(prompt: string) {
  const generateURL = process.env.GENERATE_URL;

  if (!generateURL) {
    throw new Error('url이 정의되지 않았습니다.');
  }
  const accessToken = await getAuthToken();
  const response = await fetch(generateURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_message: prompt,
      temperature: 0.3,
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    throw new Error('답변을 가져오는데 실패했습니다.');
  }

  return response.text();
}
