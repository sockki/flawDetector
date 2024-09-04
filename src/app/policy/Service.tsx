export default function MyComponent() {
  return (
    <div className="relative min-h-screen bg-white">
      <div
        className="relative flex flex-col items-center justify-center bg-cover"
        style={{
          backgroundImage: `url('/icons/policyBackground.svg')`,
          width: '192rem',
          height: '70.8rem',
          padding: '9.7rem 0',
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-[3.2rem] font-semibold leading-[4.48rem] tracking-[0.015em] text-white">
            플로디덱터 일반 사용 약관
          </h1>
          <p className="text-center text-[2rem] font-medium leading-[2.8rem] text-white">
            모든 사업 관계에서 귀하는 일련의 약관에 동의합니다. <br />본 약관은 플로디텍터 사용에
            대해 당사가 귀하와 체결한 계약입니다.
          </p>
          <p className="text-center text-[2rem] font-medium leading-[2.8rem] text-white">
            발행일 : 2024.08.28
          </p>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <div
          className="relative bg-white p-8"
          style={{
            width: '176.089rem',
            height: '54.4rem',
          }}
        >
          <p className="text-left text-[2.4rem] leading-[3.36rem] text-black">
            국회에 제출된 법률안 기타의 의안은 회기중에 의결되지 못한 이유로 폐기되지 아니한다.
            다만, 국회의원의 임기가 만료된 때에는 그러하지 아니하다. 비상계엄하의 군사재판은
            군인·군무원의 범죄나 군사에 관한 간첩죄의 경우와 초병·초소·유독음식물공급·포로에 관한
            죄중 법률이 정한 경우에 한하여 단심으로 할 수 있다. 다만, 사형을 선고한 경우에는
            그러하지 아니하다.
          </p>
        </div>
      </div>
    </div>
  );
}
