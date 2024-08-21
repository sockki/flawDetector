import { StaticImageData } from 'next/image';

export type ArticleCardProps = {
  id: number;
  label: 'new' | 'hot' | 'warn' | 'notification' | 'report';
  imageSrc?: StaticImageData;
  title: string;
  company: string;
  content: string;
  date: Date;
};
