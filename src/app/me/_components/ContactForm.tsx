import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';

export default function ContactForm() {
  return (
    <div className="flex-start box-border flex w-[98.5rem] flex-col gap-[3.2rem] rounded-[4rem] border border-primary-500 bg-white p-[6rem]">
      <div className="flex flex-col gap-[2.3rem]">
        <p className="text-[2.4rem] font-[700]">문의하기</p>
        <p className="text-[1.6rem] font-medium text-[#8f8f8f]">
          문의하고 싶은 내용을 구체적으로 작성해 주셔야 피드백이 정상적으로 반영됩니다.
        </p>
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <p className="text-[1.8rem] font-medium">Name</p>
        <Input placeholder="이름을 적어주세요." />
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <p className="text-[1.8rem] font-medium">Email</p>
        <Input disabled placeholder="justin@floatfactory.kr" />
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <p className="text-[1.8rem] font-medium">Message</p>
        <Input placeholder="내용을 적어주세요." isMultiline rows={6} />
      </div>
      <Button shape="rectangle" size="large" className="w-full text-[1.8rem]">
        문의 보내기
      </Button>
      <div className="cursor-not-allowed bg-gray-light placeholder:text-[#d6d6d6]" />
    </div>
  );
}
