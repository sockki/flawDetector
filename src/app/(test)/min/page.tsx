import DBCard from '@/components/Card/DBCard';
import DetectFileCard from '@/components/Card/DetectFileCard';

export default function page() {
  return (
    <div className="flex flex-col gap-[2rem] p-[1rem]">
      <div className="flex gap-[2.8rem]">
        <DBCard
          date="2024.03.08 13:30:24"
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          bgId={1}
        />
        <DBCard
          date="2024.03.08 13:30:24"
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          bgId={2}
        />
        <DBCard
          date="2024.03.08 13:30:24"
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          bgId={3}
        />
      </div>
      <div className="flex gap-[2.8rem]">
        <DetectFileCard title="title" caption="caption" detected={false} />
        <DetectFileCard title="title" caption="caption" detected />
      </div>
    </div>
  );
}
