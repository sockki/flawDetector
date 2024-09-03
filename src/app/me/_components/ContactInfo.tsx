export default function ContactInfo() {
  return (
    <div className="flex-start flex w-[42.9rem] flex-col justify-between gap-[7.9rem]">
      <div className="flex flex-col gap-[3rem]">
        <h1 className="text-[6rem] font-[700] leading-[9rem] text-primary-500">
          서비스 이용에
          <br />
          문제가 생겼나요?
        </h1>
        <p className="text-[2rem] font-medium leading-[2.4rem] tracking-[-0.01rem] text-gray-default">
          이용하면서 문제가 생겼다면 언제든지 문의주세요.
          <br />
          서비스 개발과 성장에 큰 도움이 됩니다.
        </p>
      </div>
      <div className="flex flex-col gap-[5.1rem]">
        <div className="flex flex-col gap-[0.8rem]">
          <p className="text-[2rem] font-bold leading-[3rem] text-gray-black">Email</p>
          <p className="text-[1.8rem] text-gray-default">justin@floatfactory.kr</p>
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <p className="text-[2rem] font-bold leading-[3rem] text-gray-black">Address</p>
          <address className="text-[1.8rem] not-italic text-gray-default">
            서울 강서구 마곡중앙2로 11 305호
          </address>
        </div>
      </div>
    </div>
  );
}
