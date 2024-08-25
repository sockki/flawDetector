import CheckedFileItem from './CheckedFileItem';

export type FileItemResponse = {
  fileName: string;
  subTitle: string;
  createdAt: Date;
};

type CheckedFileListProps = {
  checkedData: FileItemResponse[];
};

export default function CheckedFileList({ checkedData }: CheckedFileListProps) {
  return (
    <ul className="max-h-[23.1rem] min-w-[59rem] overflow-auto rounded-[0.8rem] border border-gray-dark">
      {checkedData.map(item => (
        <CheckedFileItem key={item.fileName} {...item} />
      ))}
    </ul>
  );
}
