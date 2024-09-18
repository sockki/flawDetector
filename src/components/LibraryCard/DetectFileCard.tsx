'use client';

import { getFirestoreRepositories } from '@/firebase/firebaseRepository';
import { DetectFileCardArrowIcon, DetectFileCardBugIcon, DetectFileCardStar } from '@/public/index';
import { useRepoStore } from '@/stores/useRepoStore';
import type { DetectFileCardProps, ElementByLabel } from '@/types/detectedFileCard';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

async function updateBookmarkStatus(userId: string, repoName: string, isBookmarked: boolean) {
  const response = await fetch('/api/repositories', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      repoName,
      isBookmarked,
    }),
  });
  if (!response.ok) {
    throw new Error('북마크 상태 업데이트 실패');
  }
}

export default function DetectFileCard({ title, date, userId, userName }: DetectFileCardProps) {
  const router = useRouter();
  const { repositories, setRepositories, addRecentViewed, updateRepoStatus } = useRepoStore();

  const repos = repositories.find(repo => repo.name === title);
  const [isBookmark, setIsBookmark] = useState<boolean>(repos?.isBookmarked || false);
  const [isChecked] = useState(repos?.isChecked || 'before');

  useEffect(() => {
    const fetchRepoStatus = async () => {
      const updatedRepos = await getFirestoreRepositories(userId.toString(), '최신순');
      if (updatedRepos) {
        updatedRepos.repos.forEach(repo => {
          updateRepoStatus(repo.name, repo.isChecked);
        });
      }
    };
    fetchRepoStatus();
  }, [userId, updateRepoStatus]);

  if (!repos) return null;

  const elementByLabel: ElementByLabel = {
    before: {
      labelStyle: '',
      labelText: '',
      buttonStyle: 'bg-primary-500 cursor-pointer',
      buttonText: '검사하기',
    },
    under: {
      labelStyle: 'bg-gray-light text-gray-default',
      labelText: '검사중',
      buttonStyle: 'bg-primary-500 cursor-pointer',
      buttonText: '검사하기',
    },
    done: {
      labelStyle: 'bg-primary-50 text-primary-500',
      labelText: '검사완료',
      buttonStyle: 'bg-neutral-100 cursor-pointer',
      buttonText: '결과보기',
    },
  };

  const { labelStyle, labelText, buttonStyle, buttonText } = elementByLabel[isChecked];

  const onClickBookmark = async () => {
    try {
      setIsBookmark(prev => !prev);

      setRepositories(
        repositories.map(repo =>
          repo.name === title ? { ...repo, isBookmarked: !isBookmark } : repo,
        ),
      );
      await updateBookmarkStatus(userId, title, !isBookmark);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickCheckStatus = () => {
    addRecentViewed(repos);
    router.push(`/repos/${userName}/${title}`);
  };

  return (
    <div className="group relative flex h-[22.5rem] w-[31rem] flex-col justify-between rounded-[1.2rem] border-[0.1rem] border-primary-100 bg-white p-[2rem] hover:bg-purple-light">
      <div className="absolute right-[2rem] flex items-start justify-center rounded-[1.2rem]">
        <DetectFileCardStar
          className={twMerge(
            'h-[2.8rem] w-[2.8rem] cursor-pointer stroke-primary-200 stroke-1 hover:fill-primary-100',
            isBookmark ? 'fill-primary-200 stroke-primary-200 stroke-1' : undefined,
          )}
          onClick={onClickBookmark}
        />
      </div>
      <div className="flex flex-col gap-[0.4rem]">
        <div
          className={twMerge(
            'w-fit rounded-full px-[1.2rem] py-[0.8rem] text-[1.6rem] font-medium leading-[2.24rem]',
            labelStyle,
          )}
        >
          {labelText}
        </div>
        <div className="flex gap-[0.8rem]" title={title}>
          <span className="max-w-[calc(100%-4.8rem)] overflow-hidden text-ellipsis text-[2.8rem] font-medium leading-[3.9rem] text-gray-black">
            {title}
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <button
          type="button"
          className={twMerge(
            'flex items-center gap-[0.7rem] rounded-[1.4rem] p-[1rem]',
            buttonStyle,
          )}
          onClick={onClickCheckStatus}
        >
          <DetectFileCardBugIcon />
          <span className="text-[2rem] font-regular leading-[2.8rem] text-white">{buttonText}</span>
          <DetectFileCardArrowIcon />
        </button>
        <span className="text-[1.6rem] font-medium leading-[2.24rem] text-gray-default">
          {format(date, 'yy.MM.dd')}
        </span>
      </div>
    </div>
  );
}
