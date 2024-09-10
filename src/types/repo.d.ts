type RepositoryContentsProps = {
  sha: string;
  name: string;
  path: string;
  sha: string;
  type: 'file' | 'dir';
  content?: base64;
};

type FileContentsResponse = {
  createdAt: Date;
  subTitle: string;
};
