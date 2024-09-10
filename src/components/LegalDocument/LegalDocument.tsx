type LegalDocumentProps = {
  id: string;
  title: string;
  subText: string;
  desc: string;
};

export default function LegalDocument({ text }: { text: LegalDocumentProps }) {
  return (
    <>
      <div className="mt-[-137px] flex h-[70.8rem] w-full flex-col justify-end gap-4 bg-[url('/icons/policyBackground.svg')] pb-[10rem] text-center text-white">
        <h1 className="text-[3.2rem] font-semibold leading-[4.48rem] tracking-[0.015em]">
          {text.title}
        </h1>
        <p className="whitespace-pre-wrap text-[2rem]">{text.subText}</p>
      </div>

      <div className="p-[8rem]">
        <p className="whitespace-pre-wrap text-[2.4rem] leading-[3.36rem]">{text.desc}</p>
      </div>
    </>
  );
}
