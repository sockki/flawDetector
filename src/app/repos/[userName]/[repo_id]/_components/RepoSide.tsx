'use client';

import { getFileDetail, getRepoContents } from '@/apis/repos/repository';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FolderItem } from '@/components/List/FolderItem';
import { FileItem } from '@/components/List/FileItem';
import { ListHeader } from '@/components/List/ListHeader';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useCodeFormatState, useSelectedFile } from '@/stores/Stroe';
import { useModal } from '@/hooks/useModal';
import { FileItemResponse } from '@/components/common/CheckedFileList';
import Button from '@/components/Button/Button';
import Alert from '@/components/Alert/Alert';
import { useRouter } from 'next/navigation';
import { ScanStatus } from './ScanStatus';
import { MultipleSelectModal } from './MultipleSelectModal';

type RepoSideProps = {
  params: { userName: string; repo_id: string };
};

export function RepoSide({ params }: RepoSideProps) {
  const [currentData, setCurrentData] = useState<RepositoryContentsProps[]>([]);

  const [currentPath, setCurrentPath] = useState('');
  const [lastPath, setLastPath] = useState<string[]>([]);

  const [isMultipleSelected, setIsMultipleSelected] = useState(false);
  const [multipleSelectFiles, setMultipleSelectFiles] = useState<FileItemResponse[]>([]);

  const [isModalOpen, handleClickTrigger] = useModal();
  const [isAlertOpen, setAlertOpen] = useState(false);

  const { selectedFilePaths, setSelectedFilePaths } = useSelectedFile();
  const { currentCode, setCurrentCode, setCodeType } = useCodeFormatState();

  const [resultFiles, setResultFiles] = useState<CodeStatusResult[]>([]);
  const [pendingFiles, setPendingFiles] = useState<string[]>([]);
  const [checkingFiles, setCheckingFiles] = useState<string[]>([]);

  const [fileCounts, setFileCounts] = useState({
    detectedCount: 0,
    completeCode: 0,
    suggestionCount: 0,
  });

  const router = useRouter();

  const { data: ReposittoryData } = useQuery<RepositoryContentsProps[]>({
    queryKey: ['RepoDetail', currentPath],
    queryFn: () =>
      getRepoContents({ owner: params.userName, repo: params.repo_id, path: currentPath }),
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

  const ScanCode = useMutation({
    mutationFn: generateMessage,
    scope: { id: 'CodeScan' },
  });

  const postFileStatus = async () => {
    const response = await fetch('/api/getFileStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: params.userName, repoName: params.repo_id }),
    });

    if (!response.ok) {
      throw new Error('불러오기 실패');
    }

    return response.json();
  };

  const FileStatus = useMutation({
    mutationFn: postFileStatus,
    scope: { id: 'FileStatus' },
    onSuccess: success => {
      setCheckingFiles([]);
      setResultFiles(success.results);
      setFileCounts({
        detectedCount: success.detectedCount,
        completeCode: success.completeCode,
        suggestionCount: success.suggestionCount,
      });
    },
  });

  const handleCodeScan = (multipleFilesPath?: string) => {
    const filepath = multipleFilesPath
      ? `${params.userName}/${params.repo_id}/${multipleFilesPath}`
      : `${params.userName}/${params.repo_id}/${selectedFilePaths[0]}`;

    setPendingFiles(prevFiles => prevFiles.filter(file => file !== filepath));

    setCheckingFiles([filepath]);

    const codeLines = currentCode.split('\n').map((line, index) => ({
      lineNumber: index + 1,
      content: line,
    }));
    const formattedCodeForAI = JSON.stringify(codeLines, null, 2);

    const promptMessage = `
      1. 현재 코드 내의 보안 취약점을 찾아내고 있어.
      2. ${formattedCodeForAI} 의 코드를 분석해줘.
      3. 취약점에 대한 결과를 아래 JSON 형식과 동일하게 맞춰서 한국어로 보내줘.
      4. JSON 형식 예시:
      {
        "path": ${filepath},
        "issues": [
          {
            "issue": "관련된 취약점 이슈",
            "number": 찾아낸 취약코드에 해당하는 모든 줄 번호, number[] 형식,
            "vulnerability": "취약한 이유를 관련된 취약점 이슈에 연결지어 풀어서 상세하게 설명",
            "fixDetails": "취약한 코드를 올바른 코드로 리팩토링한 것에 대한 설명"
            "modifiedCode": "취약한 코드를 올바른 코드로 리팩토링한 결과"
          }
          // 여러 개의 취약점이 있을 경우, 이 배열에 계속 추가합니다.
        ]
      }
      6. JSON형식에서 path는 내가 설정해서 보내였으니깐 수정하지말고 그대로 보내줘.
      7. 설명은 생략하고, JSON 형식만 보내줘.`;

    ScanCode.mutate(promptMessage, {
      onSuccess: () => {
        setCheckingFiles(prevFiles => prevFiles.filter(file => file !== filepath));
        FileStatus.mutate();
      },
      onError: error => {
        console.error('Unexpected error:', error.message);
        setCheckingFiles(prevFiles => prevFiles.filter(file => file !== filepath));
        setResultFiles(prevState => [
          ...prevState,
          {
            path: filepath,
            type: 'error',
          },
        ]);
      },
    });
  };

  function handleMultipleSelect() {
    setIsMultipleSelected(!isMultipleSelected);
    setPendingFiles(selectedFilePaths);
  }

  const handleMultipleScan = async () => {
    handleClickTrigger();
    handleMultipleSelect();

    await Promise.all(pendingFiles.map(filepath => handleCodeScan(filepath)));

    setSelectedFilePaths([]);
  };

  useEffect(() => {
    if (ReposittoryData) {
      const sortedData = ReposittoryData.slice().sort((a, b) => {
        if (a.type === 'dir' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'dir') return 1;
        return 0;
      });
      setCurrentData(sortedData);
    }
  }, [ReposittoryData]);

  useEffect(() => {
    FileStatus.mutate();
  }, []);

  const handleFolderClick = (folderPath: string) => {
    setLastPath(prev => [...prev, currentPath]);
    setCurrentPath(folderPath);
  };

  const handleAlertopen = () => {
    setAlertOpen(!isAlertOpen);
  };

  const handleFileClick = async (filePath: string) => {
    try {
      const fileName = filePath.split('/').pop();

      const response = await getFileDetail({
        owner: params.userName,
        repo: params.repo_id,
        path: filePath,
      });

      if (!response) {
        console.error('파일의 정보를 불러오는데 실패하였습니다.');
        return null;
      }
      setAlertOpen(true);

      const { createdAt, subTitle }: FileContentsResponse = response;

      if (isMultipleSelected) {
        setSelectedFilePaths(
          selectedFilePaths.includes(filePath)
            ? selectedFilePaths.filter(path => path !== filePath)
            : [...selectedFilePaths, filePath],
        );

        setMultipleSelectFiles(prevSelectedFiles => {
          const isFileAlreadySelected = prevSelectedFiles.some(file => file.fileName === fileName);

          if (isFileAlreadySelected) {
            setPendingFiles(prev => prev.filter(path => path !== filePath));

            return prevSelectedFiles.filter(file => file.fileName !== fileName);
          } else {
            setPendingFiles(prev => {
              if (!prev.includes(filePath)) {
                return [...prev, filePath];
              }
              return prev;
            });
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
          owner: params.userName,
          repo: params.repo_id,
          path: filePath,
        });

        const decodedCode = Buffer.from(res.content, 'base64').toString('utf-8');
        setCodeType(filePath.split('.').pop() || '');
        setCurrentCode(decodedCode);

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

  const getFileItemType = (filePath: string) => {
    const fileResult = resultFiles.find(file => file.path === filePath);

    if (checkingFiles.includes(filePath)) {
      return 'analye';
    }

    if (fileResult) {
      return fileResult.type;
    }

    if (pendingFiles.includes(filePath)) {
      return 'waiting';
    }

    return 'enabled';
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
      {ScanCode && (
        <div className="absolute left-[125rem] top-[1.5rem] bg-white">
          <Alert
            type={getFileItemType(`${params.userName}/${params.repo_id}/${selectedFilePaths[0]}`)}
            onAlertClick={
              getFileItemType(`${params.userName}/${params.repo_id}/${selectedFilePaths[0]}`) ===
              'error'
                ? () => handleCodeScan()
                : () => {
                    router.push(`/repos/${params.userName}/${params.repo_id}/repo_inspection`);
                    handleAlertopen();
                  }
            }
            isAlertOpen={isAlertOpen}
            onAlertHandle={() => handleAlertopen()}
          />
        </div>
      )}
      <Button shape="rectangle" size="large" className="h-[10.7rem] w-[24.7rem]">
        폴더 전체 검사
      </Button>
      <ScanStatus
        detectedCount={fileCounts.detectedCount}
        errorCount={fileCounts.suggestionCount}
        successCount={fileCounts.completeCode}
      />
      <div className="h-[103.6rem] w-[24.7rem] overflow-hidden overflow-y-scroll rounded-[1.2rem] border-[0.1rem] border-l border-r border-neutral-10">
        <ListHeader
          onFileSelect={() => handleMultipleSelect()}
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
                  type={getFileItemType(`${params.userName}/${params.repo_id}/${contents.path}`)}
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
        onClick={isMultipleSelected ? handleClickTrigger : () => handleCodeScan()}
      >
        검사하기
      </Button>
      <MultipleSelectModal
        onHandleModalOpen={handleClickTrigger}
        isModalOpen={isModalOpen}
        modalData={multipleSelectFiles}
        onMultipleCodeScan={handleMultipleScan}
      />
    </div>
  );
}
