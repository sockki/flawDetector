import { StaticImageData } from 'next/image';

export type LabelType = 'new' | 'hot' | 'warn' | 'notification' | 'report' | '';

export type ArticleCardProps = {
  id: number;
  label: LabelType;
  imageSrc?: StaticImageData;
  title: string;
  company: string;
  content: string;
  date: Date;
};
