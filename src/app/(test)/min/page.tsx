'use client';

import ArticleCard from '@/components/VulDbCard/ArticleCard';
import ArticleSmallCard from '@/components/VulDbCard/ArticleSmallCard';
import DetectFileCard from '@/components/LibraryCard/DetectFileCard';
import ScrapCard from '@/components/LibraryCard/ScrapCard';
import Pagination from '@/components/Pagination/Pagination';
import dummyImg from '@/public/images/BannerCardDummyImg1.png';
import BannerCard from '@/components/VulDbCard/BannerCard';
import { useState } from 'react';

export default function MinTextPage({ searchParams }: { searchParams: { page: string } }) {
  const dummyDate = new Date(2024, 7, 21, 17, 16, 0);
  const [isHoverFirstCard, setIsHoverFirstCard] = useState<boolean>(true);
  return (
    <div className="flex flex-col gap-[2rem] p-[1rem]">
      <div className="flex gap-[2.8rem]">
        <BannerCard
          id={1}
          date={dummyDate}
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          backgroundId={1}
          isHoverFirstCard={isHoverFirstCard}
          setIsHoverFirstCard={setIsHoverFirstCard}
        />
        <BannerCard
          id={2}
          date={dummyDate}
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          backgroundId={2}
          isHoverFirstCard={isHoverFirstCard}
          setIsHoverFirstCard={setIsHoverFirstCard}
        />
        <BannerCard
          id={3}
          date={dummyDate}
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          backgroundId={3}
          isHoverFirstCard={isHoverFirstCard}
          setIsHoverFirstCard={setIsHoverFirstCard}
        />
      </div>
      <div className="flex gap-[2.8rem]">
        <DetectFileCard title="Project-1" date={dummyDate} label="before" isBookmarked={false} />
        <DetectFileCard title="Project-1" date={dummyDate} label="under" isBookmarked={false} />
        <DetectFileCard title="Project-1" date={dummyDate} label="done" isBookmarked />
      </div>
      <div className="flex gap-[2.8rem]">
        <ScrapCard
          title="Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서 및 기타 취약점에 대한 보고서"
          date={dummyDate}
          label="warning"
        />
        <ScrapCard
          title="Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서 및 기타 취약점에 대한 보고서"
          date={dummyDate}
          label="notification"
        />
        <ScrapCard
          title="Microsoft의 여러 보안 취약점에 대한 CNNVD의 보고서 및 기타 취약점에 대한 보고서"
          date={dummyDate}
          label="report"
        />
      </div>

      <div className="flex flex-col gap-[2.8rem]">
        <ArticleCard
          id={1}
          label="hot"
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표"
          company="Microsoft"
          content="그런 일은"
          date={dummyDate}
        />
        <ArticleCard
          id={2}
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
          id={1}
          company="Microsoft"
          label="hot"
          title="2023년 12월 CNNVD 호환 서비스 신제품 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표 발표"
          content="그런 일은 그런 일은 그런 일은 그런 일은 그런 일은"
          date={dummyDate}
        />
        <ArticleSmallCard
          id={2}
          company="Microsoft"
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
