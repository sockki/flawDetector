type Issue = {
  issue: string;
  number: string;
  vulnerability: string;
  modifiedCode: string;
};

type FileScanResult = {
  path: string;
  issues: Issue[];
};
