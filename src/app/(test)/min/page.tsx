'use client';

import ArticleCard from '@/components/Card/ArticleCard';
import ArticleSmallCard from '@/components/Card/ArticleSmallCard';
import DBCard from '@/components/Card/DBCard';
import DetectFileCard from '@/components/Card/DetectFileCard';
import ScrapCard from '@/components/Card/ScrapCard';
import Pagination from '@/components/Pagination/Pagination';
import dummyImg from '@/public/images/DBCardDummyImg1.png';

export default function page({ searchParams }: { searchParams: { page: string } }) {
  const dummyDate = new Date(2024, 7, 21, 12, 43, 0);
  return (
    <div className="flex flex-col gap-[2rem] p-[1rem]">
      <div className="flex gap-[2.8rem]">
        <DBCard
          date={dummyDate}
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          backgroundId={1}
        />
        <DBCard
          date={dummyDate}
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          backgroundId={2}
        />
        <DBCard
          date={dummyDate}
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          backgroundId={3}
        />
      </div>
      <div className="flex gap-[2.8rem]">
        <DetectFileCard title="title" caption="caption" isDetected={false} />
        <DetectFileCard title="title" caption="caption" isDetected />
        <ScrapCard
          title="Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서 및 기타 취약점에 대한 보고서"
          date={dummyDate}
        />
      </div>
      <div className="flex flex-col gap-[2.8rem]">
        <ArticleCard
          label="hot"
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          company="Microsoft"
          content="그런 일은"
          date={dummyDate}
        />
        <ArticleCard
          label="new"
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표"
          company="Microsoft"
          content="그런 일은 그런 일은 그런 일은 그런 일은 그런 일은"
          date={dummyDate}
          imageSrc={dummyImg}
        />
      </div>
      <div className="flex gap-[2.8rem]">
        <ArticleSmallCard
          label="hot"
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표"
          content="그런 일은 그런 일은 그런 일은 그런 일은 그런 일은"
          date={dummyDate}
        />
        <ArticleSmallCard
          label="new"
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표"
          content="그런 일은 그런 일은 그런 일은 그런 일은 그런 일은"
          date={dummyDate}
          imageSrc={dummyImg}
        />
      </div>
      <Pagination nowPage={searchParams.page ? Number(searchParams.page) : 1} totalPage={20} />
    </div>
  );
}
