'use client';

import { getFileDetail, getRepoContents } from '@/apis/repos/repository';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FolderItem } from '@/components/List/FolderItem';
import { FileItem } from '@/components/List/FileItem';
import { ListHeader } from '@/components/List/ListHeader';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useCodeFormatState, useSelectedPath } from '@/stores/useRepoDetailStore';
import { useModal } from '@/hooks/useModal';
import { FileItemResponse } from '@/components/common/CheckedFileList';
import Button from '@/components/Button/Button';
import Alert from '@/components/Alert/Alert';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ScanStatus } from './ScanStatus';
import { MultipleSelectModal } from './MultipleSelectModal';

type RepoSideProps = {
  params: { userName: string; repoName: string };
};

export function RepoSide({ params }: RepoSideProps) {
  const [currentData, setCurrentData] = useState<RepositoryContentsProps[]>([]);

  const [currentPath, setCurrentPath] = useState('');
  const [lastPath, setLastPath] = useState<string[]>([]);

  const [currentFilePath, setCurrentFilePath] = useState('');

  const [multipleSelectFiles, setMultipleSelectFiles] = useState<FileItemResponse[]>([]);

  const [isModalOpen, handleClickTrigger] = useModal();
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);

  const [sortType, setSortType] = useState('folder');

  const [selectedFilePaths, setSelectedFilePaths] = useState<string[]>([]);
  const { setCurrentCode, setCodeType } = useCodeFormatState();
  const { setIsSelectedFilePath, isSelectedFilePath } = useSelectedPath();

  const [resultFiles, setResultFiles] = useState<CodeStatusResult[]>([]);
  const [waitingFiles, setWaitFiles] = useState<string[]>([]);
  const [pendingFiles, setPendingFiles] = useState<string[]>([]);
  const [checkingFiles, setCheckingFiles] = useState<string[]>([]);

  const [fileCounts, setFileCounts] = useState({
    detectedCount: 0,
    completeCode: 0,
    suggestionCount: 0,
  });

  const router = useRouter();
  const { data } = useSession();
  const userId = data?.user.id;

  const { data: ReposittoryData } = useQuery<RepositoryContentsProps[]>({
    queryKey: ['RepoDetail', currentPath, params],
    queryFn: () =>
      getRepoContents({ owner: params.userName, repo: params.repoName, path: currentPath }),
    refetchOnMount: true,
  });

  const generateMessage = async (promptMessage: string) => {
    const response = await fetch('/api/saveCodeScanResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: data?.user.id,
        repoName: params.repoName,
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
      body: JSON.stringify({
        userName: params.userName,
        repoName: params.repoName,
        userId,
      }),
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
      setResultFiles(prev => [...prev, ...success.results]);
      setFileCounts({
        detectedCount: success.detectedCount,
        completeCode: success.completeCode,
        suggestionCount: success.suggestionCount,
      });
    },
  });

  const handleCodeScan = async (multipleFilesPath?: string) => {
    const filepath = `${multipleFilesPath}`;

    setWaitFiles(prevFiles => prevFiles.filter(file => file !== filepath));
    setCheckingFiles(pre => [...pre, filepath]);
    let decodedCode = '';

    const pathSegments = filepath.split('/').slice(2).join('/');
    const res = await getRepoContents({
      owner: params.userName,
      repo: params.repoName,
      path: pathSegments,
    });
    decodedCode = Buffer.from(res.content, 'base64').toString('utf-8');

    setCheckingFiles([filepath]);

    const codeLines = decodedCode.split('\n').map((line, index) => ({
      lineNumber: index + 1,
      content: line,
    }));

    const formattedCodeForAI = JSON.stringify(codeLines, null, 2);

    const promptMessage = `
      1. 제공된 코드 내의 보안 취약점을 찾아내고 분석해줘.
      2. 분석할 코드는 다음과 같습니다: ${formattedCodeForAI}
      3. 코드에서 발견된 모든 보안 취약점을 찾아내고, 각각에 대해 상세한 정보를 제공해줘.
      4. 각 취약점에 대한 정보를 아래와 같은 JSON 형식으로 정리해줘:
      {
        "path": "${filepath}", // 제공된 경로, 수정하지 마세요.
        "issues": [
          {
            "issue": "발견된 취약점의 이름 또는 간단한 설명",
            "number": [발견된 취약점에대한 코드의 줄 번호를 모두 나열한 배열], // 예: [1,2,3,4,5,6]
            "vulnerability": "취약점이 발생한 이유와 관련된 보안 문제에 대한 상세한 설명. 이 취약점이 왜 위험한지, 어떤 공격이 가능한지 설명해줘.",
            "fixDetails": "취약한 코드를 안전하게 리팩토링한 방법을 설명해줘. 가능한 경우, 코드 수정 전후를 비교하여 설명하면 좋습니다.",
            "modifiedCode": "취약한 코드를 수정한 결과를 올바른 코드로 제시해줘."
          }
          // 추가 취약점이 있을 경우, 이 배열에 계속 추가해줘.
        ]
      }
      5. JSON 형식에서 'path'는 수정하지 말고 그대로 유지해줘.
      6. 설명은 생략하고, 위의 JSON 형식에 맞춰서 분석 결과만 보내줘.`;

    await ScanCode.mutateAsync(promptMessage, {
      onSuccess: () => {
        FileStatus.mutate();
      },
      onError: error => {
        console.error('Unexpected error:', error.message);
        setResultFiles(prevState => [
          ...prevState,
          {
            path: filepath,
            type: 'error',
          },
        ]);
      },
    });
    setCheckingFiles(prevFiles => prevFiles.filter(file => file !== filepath));
  };

  const handleMultipleScan = async () => {
    handleClickTrigger();

    setWaitFiles(pendingFiles);
    setIsSelectedFilePath(pendingFiles[0].split('/').slice(2).join('/'));
    const res: RepositoryContentsProps = await getRepoContents({
      owner: params.userName,
      repo: params.repoName,
      path: pendingFiles[0].split('/').slice(2).join('/'),
    });
    const decodedCode = Buffer.from(res.content, 'base64').toString('utf-8');
    setCurrentCode(decodedCode);

    await pendingFiles
      .map(filepath => async () => {
        try {
          await handleCodeScan(filepath); // 파일 스캔 실행
          setPendingFiles(prevFiles => prevFiles.filter(file => file !== filepath)); // 스캔 완료된 파일 제거
        } catch (error) {
          console.error('Failed to scan file:', filepath, error);
          setResultFiles(prevState => [
            ...prevState,
            {
              path: filepath,
              type: 'error',
            },
          ]);
        }
      })
      .reduce((prevPromise, scanFunction) => prevPromise.then(scanFunction), Promise.resolve());
  };

  useEffect(() => {
    if (ReposittoryData) {
      const sortedData = ReposittoryData.slice().sort((a, b) => {
        if (a.type === 'dir' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'dir') return 1;
        return 0;
      });

      if (JSON.stringify(currentData) !== JSON.stringify(sortedData)) {
        setCurrentData(sortedData);
      }
    }
  }, [ReposittoryData, currentData]);

  useEffect(() => {
    if (sortType === 'folder') {
      const sortedData = currentData.slice().sort((a, b) => {
        if (a.type === 'dir' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'dir') return 1;
        return 0;
      });
      setCurrentData(sortedData);
    }
    if (sortType === 'checked') {
      const resultPaths = resultFiles.map(file => file.path);
      const checkedData = currentData.slice().sort((a, b) => {
        const aIncluded = resultPaths.includes(`${params.userName}/${params.repoName}/${a.path}`);
        const bIncluded = resultPaths.includes(`${params.userName}/${params.repoName}/${b.path}`);
        if (aIncluded === bIncluded) {
          return 0;
        }
        return aIncluded ? -1 : 1;
      });
      setCurrentData(checkedData);
    }
    if (sortType === 'unchecked') {
      const resultPaths = resultFiles.map(file => file.path);
      const uncheckedData = currentData.slice().sort((a, b) => {
        const aIncluded = !resultPaths.includes(`${params.userName}/${params.repoName}/${a.path}`);
        const bIncluded = !resultPaths.includes(`${params.userName}/${params.repoName}/${b.path}`);
        if (aIncluded === bIncluded) {
          return 0;
        }
        return aIncluded ? -1 : 1;
      });
      setCurrentData(uncheckedData);
    }
  }, [sortType]);

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

  const handleSortOpen = () => {
    setSortOpen(!isSortOpen);
  };

  const handleSortType = (type: string) => {
    setSortType(type);
  };

  const handleCheckClick = async (filePath: string) => {
    try {
      const fileName = filePath.split('/').pop();
      const fullPath = `${params.userName}/${params.repoName}/${filePath}`;

      // 파일 세부 정보를 가져옴
      const response = await getFileDetail({
        owner: params.userName,
        repo: params.repoName,
        path: filePath,
      });

      if (!response) {
        console.error('파일의 정보를 불러오는데 실패하였습니다.');
        return null; // 파일 정보를 가져오지 못했을 때 null 반환
      }
      setIsSelectedFilePath(filePath);
      setAlertOpen(true);

      const { createdAt, subTitle }: FileContentsResponse = response;

      // 파일이 선택되었는지 여부에 따라 상태 업데이트
      if (selectedFilePaths.includes(filePath)) {
        // 파일이 이미 선택된 경우, 선택 해제
        setSelectedFilePaths(selectedFilePaths.filter(path => path !== filePath));
        setMultipleSelectFiles(prevSelectedFiles =>
          prevSelectedFiles.filter(file => file.fileName !== fileName),
        );
        setPendingFiles(prev => prev.filter(path => path !== fullPath));
      } else {
        // 파일을 선택함
        setSelectedFilePaths([...selectedFilePaths, filePath]);
        setMultipleSelectFiles(prevSelectedFiles => [
          ...prevSelectedFiles,
          {
            fileName: fileName || '',
            subTitle,
            createdAt: new Date(createdAt),
          },
        ]);
        setPendingFiles(prev => (!prev.includes(fullPath) ? [...prev, fullPath] : prev));
      }

      // 선택된 파일의 내용을 가져옴
      const res: RepositoryContentsProps = await getRepoContents({
        owner: params.userName,
        repo: params.repoName,
        path: filePath,
      });

      if (!res.content) {
        console.error('파일 내용을 가져오는데 실패했습니다.');
        return null; // 파일 내용을 가져오지 못했을 때 null 반환
      }

      const decodedCode = Buffer.from(res.content, 'base64').toString('utf-8');
      setCodeType(filePath.split('.').pop() || '');
      setCurrentCode(decodedCode);
      return null; // 모든 로직이 완료되었을 때 null 반환
    } catch (error) {
      console.error('파일 처리 중 오류가 발생했습니다:', error);
      return null; // 오류 발생 시 null 반환
    }
  };

  const handleFileClick = async (filePath: string) => {
    setCurrentFilePath(filePath);
    setIsSelectedFilePath(filePath);
    setAlertOpen(true);

    // 선택된 파일의 내용을 가져옴
    const res: RepositoryContentsProps = await getRepoContents({
      owner: params.userName,
      repo: params.repoName,
      path: filePath,
    });

    if (!res.content) {
      console.error('파일 내용을 가져오는데 실패했습니다.');
      return null;
    }

    const decodedCode = Buffer.from(res.content, 'base64').toString('utf-8');
    setCodeType(filePath.split('.').pop() || '');
    setCurrentCode(decodedCode);
    return null;
  };

  const getFileItemType = (filePath: string) => {
    const fileResult = resultFiles.find(file => file.path === filePath);

    if (fileResult) {
      return fileResult.type;
    }

    if (checkingFiles.includes(filePath)) {
      return 'analye';
    }

    if (waitingFiles.includes(filePath)) {
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
    <div className="relative mb-[2rem] flex h-[103.2rem] flex-col gap-[2.8rem]">
      {ScanCode && (
        <div className="absolute left-[100rem] top-[1.5rem] bg-white">
          <Alert
            type={getFileItemType(`${params.userName}/${params.repoName}/${currentFilePath}`)}
            onAlertClick={
              getFileItemType(`${params.userName}/${params.repoName}/${currentFilePath}`) ===
              'error'
                ? () => handleCodeScan(`${params.userName}/${params.repoName}/${currentFilePath}`)
                : () => {
                    router.push(`/repos/${params.userName}/${params.repoName}/repo_inspection`);
                    handleAlertopen();
                  }
            }
            isAlertOpen={isAlertOpen}
            onAlertHandle={() => handleAlertopen()}
          />
        </div>
      )}
      <Button
        shape="rectangle"
        size="large"
        className="h-[10.7rem] w-[24.7rem]"
        onClick={handleClickTrigger}
      >
        파일 검사 하기
      </Button>
      <ScanStatus
        detectedCount={fileCounts.detectedCount}
        errorCount={fileCounts.suggestionCount}
        successCount={fileCounts.completeCode}
      />
      <div className="max-h-[103.2rem] w-[24.7rem] overflow-hidden overflow-y-scroll rounded-[1.2rem] border-[0.1rem] border-l border-r border-neutral-10">
        <div className="sticky top-0 border-b bg-white">
          <ListHeader
            isSortOpen={isSortOpen}
            onListClick={handleSortOpen}
            onChangeSortType={handleSortType}
          />
          {currentPath === '' ? (
            <div
              className="flex h-[4.4rem] w-[24.7rem] cursor-pointer gap-[1rem] border-t p-[1rem] px-[1.5rem] text-[1.6rem]"
              onClick={() => handleFolderClick('')}
            >
              All Files
            </div>
          ) : (
            <div className="flex h-[4.4rem] w-[24.7rem] items-center overscroll-x-auto border-t p-[1rem] px-[1.5rem] text-[1.6rem]">
              <div
                className="mr-[0.2rem] w-[5.9rem] cursor-pointer text-[#c3c3c3] hover:underline"
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
                        'max-w-[7.2rem] truncate',
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
          {currentPath && (
            <FolderItem folderName="..." type="enabled" onFolderClick={handleParentDirectory} />
          )}
        </div>
        <div className="overflow-y-scroll text-[1rem] first:border-t-0">
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
                  type={getFileItemType(`${params.userName}/${params.repoName}/${contents.path}`)}
                  isSelected={isSelectedFilePath.includes(contents.path)}
                  onFileClick={() => handleFileClick(contents.path)}
                  onCheckClick={() => handleCheckClick(contents.path)}
                />
              ),
            )}
        </div>
      </div>
      <MultipleSelectModal
        onHandleModalOpen={handleClickTrigger}
        isModalOpen={isModalOpen}
        modalData={multipleSelectFiles}
        onMultipleCodeScan={handleMultipleScan}
      />
    </div>
  );
}
