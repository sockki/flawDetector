'use client';

import { getFileDetail, getRepoContents } from '@/apis/repos/repository';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FolderItem } from '@/components/List/FolderItem';
import { FileItem } from '@/components/List/FileItem';
import { ListHeader } from '@/components/List/ListHeader';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useCodeFormatState } from '@/stores/Stroe';
import { useModal } from '@/hooks/useModal';
import { FileItemResponse } from '@/components/common/CheckedFileList';
import Button from '@/components/Button/Button';
import Alert from '@/components/Alert/Alert';
import { usePathname } from 'next/navigation';
import { ScanStatus } from './ScanStatus';
import { MultipleSelectModal } from './MultipleSelectModal';

export function RepoSide() {
  const [currentData, setCurrentData] = useState<RepositoryContentsProps[]>([]);

  const [currentPath, setCurrentPath] = useState('');
  const [lastPath, setLastPath] = useState<string[]>([]);
  const [selectedFilePaths, setSelectedFilePaths] = useState<string[]>([]);

  const [isMultipleSelected, setIsMultipleSelected] = useState(false);
  const [multipleSelectFiles, setMultipleSelectFiles] = useState<FileItemResponse[]>([]);

  const [isModalOpen, handleClickTrigger] = useModal();
  const { currentCode, setCurrentCode, setCodeType } = useCodeFormatState();

  const PathName = usePathname();
  const userName = PathName.split('/')[2];
  const repoName = PathName.split('/')[3];

  const { data } = useQuery<RepositoryContentsProps[]>({
    queryKey: ['RepoDetail', currentPath],
    queryFn: () => getRepoContents({ owner: userName, repo: repoName, path: currentPath }),
  });

  const generateMessage = async (promptMessage: string) => {
    const response = await fetch('/api/saveCodeScanResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: promptMessage,
      }),
    });

    if (!response.ok) {
      throw new Error('응답 생성 실패');
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: generateMessage,
    scope: { id: 'CodeScan' },
    onError: error => {
      console.error('Error scanning code:', error);
    },
    onSuccess: success => {
      console.log('Scan successful:', success);
    },
  });

  const handleScan = () => {
    const promptMessage = `
    1. 현재 코드 내의 보안 취약점을 찾아내고 있어.
    2. ${currentCode} 의 코드를 분석해줘.
    3. 취약점에 대한 결과를 아래 JSON 형식과 동일하게 맞춰서 한국어로 보내줘.
    4. 결과는 파일 경로(path)와 그 파일 내의 모든 취약점(issues)을 포함하는 JSON 객체 형식이어야 해.
    5. JSON 형식 예시:
    {
      "path": ${selectedFilePaths},
      "issues": [
        {
          "issue": "관련된 취약점 이슈",
          "number": "찾아낸 취약코드의 줄 번호",
          "vulnerability": "취약한 이유",
          "modifiedCode": "취약한 코드를 올바른 코드로 리팩토링한 결과"
        }
        // 여러 개의 취약점이 있을 경우, 이 배열에 계속 추가합니다.
      ]
    }
    6. JSON형식에서 path는 내가 설정해서 보내였으니깐 수정하지말고 그대로 보내줘.
    7. 설명은 생략하고, JSON 형식만 보내줘.`;
    mutation.mutate(promptMessage);
  };

  useEffect(() => {
    if (data) {
      const sortedData = data.slice().sort((a, b) => {
        if (a.type === 'dir' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'dir') return 1;
        return 0;
      });
      setCurrentData(sortedData);
    }
  }, [data]);

  function handleMultipleSelect() {
    setIsMultipleSelected(!isMultipleSelected);
  }

  const handleFolderClick = (folderPath: string) => {
    setLastPath(prev => [...prev, currentPath]);
    setCurrentPath(folderPath);
  };

  const handleFileClick = async (filePath: string) => {
    try {
      const fileName = filePath.split('/').pop();

      const response = await getFileDetail({
        owner: userName,
        repo: repoName,
        path: filePath,
      });

      if (!response) {
        console.error('파일의 정보를 불러오는데 실패하였습니다.');
        return null;
      }

      const { createdAt, subTitle }: FileContentsResponse = response;

      if (isMultipleSelected) {
        setSelectedFilePaths(prevSelected =>
          prevSelected.includes(filePath)
            ? prevSelected.filter(path => path !== filePath)
            : [...prevSelected, filePath],
        );

        setMultipleSelectFiles(prevSelectedFiles => {
          const isFileAlreadySelected = prevSelectedFiles.some(file => file.fileName === fileName);

          if (isFileAlreadySelected) {
            return prevSelectedFiles.filter(file => file.fileName !== fileName);
          } else {
            return [
              ...prevSelectedFiles,
              {
                fileName: fileName || '',
                subTitle,
                createdAt: new Date(createdAt),
              },
            ];
          }
        });
      } else {
        setSelectedFilePaths([filePath]);

        const res: RepositoryContentsProps = await getRepoContents({
          owner: userName,
          repo: repoName,
          path: filePath,
        });

        const incodingCode = Buffer.from(res.content, 'base64').toString('utf-8');
        setCodeType(filePath.split('.').pop() || '');
        setCurrentCode(incodingCode);

        setMultipleSelectFiles([
          {
            fileName: fileName || '',
            subTitle,
            createdAt: new Date(createdAt),
          },
        ]);
      }
      return null;
    } catch (error) {
      console.error('파일 처리 중 오류가 발생했습니다:', error);
      return null;
    }
  };

  const handleParentDirectory = () => {
    if (lastPath.length > 0) {
      const previousPath = lastPath[lastPath.length - 1];
      setLastPath(prev => prev.slice(0, -1));
      setCurrentPath(previousPath);
      setCurrentData([]);
    }
  };

  const pathSegments = currentPath.split('/').filter(segment => segment !== '');

  return (
    <div className="relative mb-[2rem] flex flex-col gap-[2.8rem]">
      {mutation && (
        <div className="absolute left-[125rem] top-[1.5rem] bg-white">
          {(() => {
            if (mutation.isPending) {
              return <Alert type="checking" />;
            } else if (mutation.isError) {
              return <Alert type="error" />;
            } else {
              return <Alert type="complete" />;
            }
          })()}
        </div>
      )}
      <Button shape="rectangle" size="large" className="h-[10.7rem] w-[24.7rem]">
        폴더 전체 검사
      </Button>
      <ScanStatus detectedCount={14} errorCount={8} successCount={23} />
      <div className="h-[103.6rem] w-[24.7rem] overflow-hidden overflow-y-scroll rounded-[1.2rem] border-[0.1rem] border-l border-r border-neutral-10">
        <ListHeader
          onFileSelect={() => handleMultipleSelect}
          isMultipleSelected={isMultipleSelected}
        />
        {currentPath === '' ? (
          <div
            className="flex h-[4.4rem] w-[24.7rem] cursor-pointer gap-[1rem] border-b border-t p-[1rem] px-[1.5rem] text-[1.6rem]"
            onClick={() => handleFolderClick('')}
          >
            All Files
          </div>
        ) : (
          <div className="flex h-[4.4rem] w-[24.7rem] items-center border-b border-t p-[1rem] px-[1.5rem] text-[1.6rem]">
            <div
              className="mr-[0.2rem] cursor-pointer text-[#c3c3c3] hover:underline"
              onClick={() => handleFolderClick('')}
            >
              All Files
            </div>
            {pathSegments.map((segment, index) => {
              const partialPath = pathSegments.slice(0, index + 1).join('/');
              return (
                <span key={segment} className="flex items-center">
                  <span className="mx-[0.3rem]">/</span>
                  <span
                    className={twMerge(
                      index === pathSegments.length - 1 ? 'text-primary-500' : 'text-[#c3c3c3]',
                      'cursor-pointer hover:underline',
                    )}
                    onClick={() => handleFolderClick(partialPath)}
                  >
                    {segment}
                  </span>
                </span>
              );
            })}
          </div>
        )}
        <div className="overflow-y-scroll text-[1rem]">
          {currentPath && (
            <FolderItem folderName="..." type="enabled" onFolderClick={handleParentDirectory} />
          )}
          {currentData &&
            currentData.map(contents =>
              contents.type === 'dir' ? (
                <FolderItem
                  key={contents.sha}
                  folderName={contents.name}
                  type="enabled"
                  onFolderClick={() => handleFolderClick(contents.path)}
                />
              ) : (
                <FileItem
                  key={contents.sha}
                  fileName={contents.name}
                  type="enabled"
                  isSelected={selectedFilePaths.includes(contents.path)}
                  onFileClick={() => handleFileClick(contents.path)}
                />
              ),
            )}
        </div>
      </div>
      <Button
        shape="rectangle"
        size="large"
        className="w-[24.7rem]"
        onClick={isMultipleSelected ? handleClickTrigger : handleScan}
      >
        검사하기
      </Button>
      <MultipleSelectModal
        onHandleModalOpen={handleClickTrigger}
        isModalOpen={isModalOpen}
        modalData={multipleSelectFiles}
      />
    </div>
  );
}
