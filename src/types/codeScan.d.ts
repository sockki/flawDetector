type Issue = {
  issue: string;
  number: number[];
  vulnerability: string;
  modifiedCode: string;
  fixDetails: string;
};

type FileScanResult = {
  result: { userId: string; repoName: string; path: string; issues: Issue[] };
};

type FetchCodeStatusProps = {
  userName: string;
  repoName: string;
  userId: string;
};

type CodeStatusResult = {
  path: string;
  type: 'error' | 'success';
};
