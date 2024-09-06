import { octokit } from './octokit';

export async function getRepoList(userName: string = '', page: number = 1, per_page: number = 16) {
  try {
    const response = await octokit.request(`GET /users/${userName}/repos`, {
      userName,
      page,
      per_page,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    return response.data;
  } catch (error) {
    console.error('레포지토리 목록를 가져오는 중 에러가 발생했습니다:', error);
    return null;
  }
}
