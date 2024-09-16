type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="mx-auto mt-[15rem] flex flex-col items-center justify-center">
      <h2 className="text-[3.2rem] font-bold text-gray-black">{title}</h2>
      <h4 className="text-[2.4rem] font-regular text-gray-default">{description}</h4>
    </div>
  );
}
