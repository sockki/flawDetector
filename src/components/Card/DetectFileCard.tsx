type DetectFileCardProps = {
  title: string;
  caption: string;
  detected: boolean;
};

export default function DetectFileCard({ caption, title, detected }: DetectFileCardProps) {
  console.log(detected);
  return (
    <div>
      <div>
        <label>label</label>
      </div>
      <div>
        <span>{title}</span>
        <span>{caption}</span>
      </div>
    </div>
  );
}
