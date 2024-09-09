type Issue = {
  issue: string;
  number: number;
  vulnerability: string;
  modifiedCode: string;
  fixDetails: string;
};

type FileScanResult = {
  result: { path: string; issues: Issue[] };
};
