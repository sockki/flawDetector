'use client';

import InfoBox from '@/components/InfoBox/InfoBox';
import { useMutation } from '@tanstack/react-query';
import { useSelectedFile } from '@/stores/Stroe';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ScanFormat } from '../../_components/ScanFormat';

type ResultFormatProps = {
  params: { userName: string; repoName: string };
};

export function ResultFormat({ params }: ResultFormatProps) {
  const { selectedFilePaths } = useSelectedFile();
  const [highLightedLines, setHighLightedLines] = useState<number[]>([]);
  const [scrollToLine, setScrollToLine] = useState<number | null>(0);

  const { data } = useSession();
  const sessionUserId = data?.user?.id;

  const postCodeScanResult = async (repoName: string, userId: string, path: string) => {
    const response = await fetch('/api/getCodeScanResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repoName, userId, path }),
    });

    if (!response.ok) {
      throw new Error('불러오기 실패');
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: ({ repoName, userId, path }: { repoName: string; userId: string; path: string }) =>
      postCodeScanResult(repoName, userId, path),
  });

  const handleLineClick = (lineNumber: number) => {
    setScrollToLine(lineNumber);
    setTimeout(() => setScrollToLine(null), 100);
  };

  useEffect(() => {
    const performMutation = () => {
      if (selectedFilePaths.length > 0) {
        mutation.mutate({
          repoName: params.repoName,
          userId: sessionUserId || '',
          path: `${params.userName}/${params.repoName}/${selectedFilePaths[0]}`,
        });
      }
    };

    performMutation();
  }, [selectedFilePaths, params.userName, params.repoName]);

  useEffect(() => {
    setHighLightedLines([]);
    if (mutation.data) {
      mutation.data.forEach((fileResult: FileScanResult) => {
        const { result } = fileResult;
        if (result && result.issues) {
          result.issues.map(issue => setHighLightedLines(prev => [...prev, ...issue.number]));
        }
      });
    }
  }, [mutation.data]);

  return (
    <div>
      <ScanFormat resultType highLightedLines={highLightedLines} scrollToLine={scrollToLine} />
      <div className="mt-[3rem] h-[83.5rem] overflow-scroll pb-[1rem]">
        {mutation.data && mutation.data.length === 0 && (
          <div className="flex h-[52.1rem] w-[148.5rem] flex-col items-center justify-center gap-[2.4rem]">
            <div className="text-[3.2rem] font-bold">검출된 취약점이 없어요</div>
            <div className="flex flex-col items-center text-[2.4rem] font-regular text-gray-default">
              취약점이 발견되지 않았지만 새로 업데이트할 경우 파일을 한번 더 검사해주세요.
              <div>파일을 한번 더 검사해주세요.</div>
            </div>
          </div>
        )}

        {mutation.data &&
          mutation.data.length > 0 &&
          mutation.data.map((fileResult: FileScanResult) => {
            const { result } = fileResult;
            if (result && result.issues) {
              return result.issues.map((issue: Issue) => (
                <InfoBox
                  theme="red"
                  issue={issue.issue}
                  modifiedCode={issue.modifiedCode}
                  number={issue.number}
                  vulnerability={issue.vulnerability}
                  fixDetails={issue.fixDetails}
                  key={issue.issue}
                  location
                  bullet
                  onLineClick={handleLineClick}
                />
              ));
            }
            return null;
          })}
      </div>
    </div>
  );
}
