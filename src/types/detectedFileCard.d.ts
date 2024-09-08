export type DetectFileLabelType = 'before' | 'under' | 'done';

export type ElementByLabel = {
  [key in DetectFileLabelType]: {
    labelStyle: string;
    labelText: string;
    buttonText: string;
    buttonStyle: string;
  };
};

export type DetectFileCardProps = {
  title: string;
  label: DetectFileLabelType;
  date: Date;
  isBookmarked: boolean;
  userId: string;
  userName: string;
  repoId: string;
};
