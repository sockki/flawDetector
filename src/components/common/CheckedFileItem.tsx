import { DocumentIcon } from '@/public/index';
import { formatDistanceToNowStrict } from 'date-fns';
import { ko } from 'date-fns/locale';

type CheckFileItem = {
  fileName?: string;
  subTitle?: string;
  createdAt: Date;
};

export default function CheckedFileItem({ fileName, subTitle, createdAt }: CheckFileItem) {
  return (
    <li className="flex items-center justify-between border-b border-gray-dark p-[1rem] text-[1.2rem] text-gray-default last:border-none">
      <div className="flex w-[30rem] items-center justify-start gap-[1rem] text-[1.6rem]">
        <DocumentIcon />
        <span className="overflow-hidden text-ellipsis text-black">{fileName}</span>
      </div>
      <p className="w-[15rem] text-center">{subTitle}</p>
      <span className="w-[5rem] text-right">
        {formatDistanceToNowStrict(createdAt, { addSuffix: true, locale: ko })}
      </span>
    </li>
  );
}
