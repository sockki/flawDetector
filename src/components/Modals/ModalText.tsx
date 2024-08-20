type ModalTextProps = {
  subtitle: string[];
  helpText?: string;
};

export default function ModalText({ subtitle, helpText }: ModalTextProps) {
  return (
    <div className="text-center font-regular text-gray-default">
      <h3 className="p-[1rem] text-[1.6rem]">
        {subtitle.map(line => (
          <p key={line}>{line}</p>
        ))}
      </h3>

      {helpText && <p className="p-[1rem] text-[1.2rem]">{helpText}</p>}
    </div>
  );
}
