export type CrawlingData = {
  title: string;
  keyword: string;
  uploadDate: DateObject;
  scrapDate: Date;
  content: Content[];
  views: number;
};

export type ArticleData = {
  title: string;
  keyword: string;
  uploadDate: DateObject;
  scrapDate: Date;
  content: Content[];
  views: number;
  id: string;
};

type DateObject = { seconds: number; nanoseconds: number };

export type Content = string | Table;

type Table = {
  table?: TableObject[];
};

export type TableObject = {
  column1?: string;
  column2?: string;
  column3?: string;
  column4?: string;
  column5?: string;
  column6?: string;
  column7?: string;
};
