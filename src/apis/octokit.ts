import { Octokit } from 'octokit';

const { OCTOKIT_TOKEN } = process.env;

if (!OCTOKIT_TOKEN) {
  throw new Error('.env 파일의 git hub token이 잘못되었습니다.');
}

export const octokit = new Octokit({
  auth: OCTOKIT_TOKEN,
});
