import { octokit } from './octokit';

type GetRepoItemsProps = {
  owner: string;
  repo: string;
};

export async function getRepoItems({ owner, repo }: GetRepoItemsProps) {
  try {
    const response = await octokit.request(`GET /repos/${owner}/${repo}`, {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    return response.data;
  } catch (error) {
    console.error('레포지토리를 가져오는 중 에러가 발생했습니다:', error);
    return null;
  }
}
