import { LabelType } from './articleCard';

export type CrawlingData = {
  title: string;
  keyword: string;
  uploadDate: DateObject;
  scrapDate: Date;
  content: Content[];
  view: number;
  company: string;
};

export type ArticleData = {
  title: string;
  keyword: string;
  uploadDate: DateObject;
  scrapDate: Date;
  content: Content[];
  view: number;
  company: string;
  id: string;
  labelList: LabelType[];
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

export type GetLabelData = {
  hotIdSet: Set<string>;
  newIdSet: Set<string>;
};

export type DetailResponse = { articleDetailData: ArticleData; relativeData: ArticleData[] };
