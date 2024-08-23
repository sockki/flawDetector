export function ScanEntireFolder() {
  const containterStyles =
    'flex h-[10.7rem] w-[24.7rem] items-center justify-center rounded-[0.8rem] bg-primary-500 px-[6rem] py-[1.6rem]';
  const contentStyles = 'h-fit w-fit whitespace-nowrap text-[2.4rem] font-bold text-white';
  return (
    <div className={containterStyles}>
      <div className={contentStyles}>폴더 전체 검사</div>
    </div>
  );
}
