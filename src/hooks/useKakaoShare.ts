'use client';

import { Kakao } from '@/types/kakao';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: Kakao;
  }
}

const useKakaoShare = (shareUrl: string) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY!);
      }
    }
  }, []);

  const shareKakao = (title: string) => {
    const kakao = window.Kakao;

    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        imageUrl: '/public/images/BannerCardDummyImg3.png',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },

      buttons: [
        {
          title: '플로디텍터 바로가기',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  };
  return { shareKakao };
};

export default useKakaoShare;
