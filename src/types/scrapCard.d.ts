type ScrapLabelType = 'warning' | 'notification' | 'report';

export type ElementByLabel = {
  [key in ScrapLabelType]: {
    labelStyle: string;
    labelText: string;
  };
};

export type ScrapCardProps = {
  title: string;
  date: Date;
  label: ScrapLabelType;
  id: string;
};
