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

export async function getRepolist(userName: string = '') {
  try {
    const response = await octokit.request(`GET /users/${userName}/repos`, {
      userName,
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

export async function getFileDetail({ owner, repo, path }: GetRepoContentsProps) {
  try {
    const response = await octokit.request(`GET /repos/${owner}/${repo}/commits`, {
      owner,
      repo,
      path,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (response.data.length > 0) {
      const createdAt = response.data[0].commit.committer.date;
      const subTitle = response.data[0].commit.message;
      return { createdAt, subTitle };
    } else {
      console.warn('해당 파일에 대한 커밋 내역이 없습니다.');
      return null;
    }
  } catch (error) {
    console.error('파일 정보를 가져오는 중 에러가 발생했습니다:', error);
    return null;
  }
}
