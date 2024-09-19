import { StaticImageData } from 'next/image';

export type LabelType = 'new' | 'hot' | 'warn' | 'notification' | 'report';

export type ArticleCardProps = {
  id: string;
  labelList: LabelType[];
  imageSrc?: StaticImageData;
  title: string;
  keyword: string;
  company: string;
  content: string;
  date: Date;
  isScrapped: boolean;
};
