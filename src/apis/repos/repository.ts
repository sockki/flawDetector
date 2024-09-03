import { octokit } from './octokit';

type GetRepoContentsProps = {
  owner: string;
  repo: string;
  path?: string;
};

export async function getRepoContents({ owner, repo, path = '' }: GetRepoContentsProps) {
  try {
    const response = await octokit.request(`GET /repos/${owner}/${repo}/contents/${path}`, {
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
