import DBCard from '@/components/Card/DBCard';
import DetectFileCard from '@/components/Card/DetectFileCard';

export default function page() {
  return (
    <div className="p-[1rem]">
      <div className="flex gap-[2.8rem]">
        <DBCard
          date="2024.03.08 13:30:24"
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          id={1}
        />
        <DBCard
          date="2024.03.08 13:30:24"
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          id={2}
        />
        <DBCard
          date="2024.03.08 13:30:24"
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          id={3}
        />
      </div>
      <div className="flex gap-[2.8rem]">
        <DetectFileCard title="" caption="" detected={false} />
      </div>
    </div>
  );
}
