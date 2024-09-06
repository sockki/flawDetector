'use client';

import { getFileDetail, getRepoContents } from '@/apis/repos/repository';
import { useQuery } from '@tanstack/react-query';
import { FolderItem } from '@/components/List/FolderItem';
import { FileItem } from '@/components/List/FileItem';
import { ListHeader } from '@/components/List/ListHeader';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useCodeFormatState } from '@/stores/Stroe';
import { useModal } from '@/hooks/useModal';
import { FileItemResponse } from '@/components/common/CheckedFileList';
import Button from '@/components/Button/Button';
import { ScanStatus } from './ScanStatus';
import { ScanEntireFolder } from './ScanEntireFolder';
import { MultipleSelectModal } from './MultipleSelectModal';

export function RepoSide() {
  const [currentData, setCurrentData] = useState<RepositoryContentsProps[]>([]);

  const [currentPath, setCurrentPath] = useState('');
  const [lastPath, setLastPath] = useState<string[]>([]);
  const [selectedFilePaths, setSelectedFilePaths] = useState<string[]>([]);

  const [isMultipleSelected, setIsMultipleSelected] = useState(false);
  const [multipleSelectFiles, setMultipleSelectFiles] = useState<FileItemResponse[]>([]);

  const [isModalOpen, handleClickTrigger] = useModal();
  const { setCurrentCode, setCodeType } = useCodeFormatState();

  const { data } = useQuery<RepositoryContentsProps[]>({
    queryKey: ['RepoDetail', currentPath],
    queryFn: () => getRepoContents({ owner: 'chaduhwan', repo: 'Project2', path: currentPath }),
  });

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
        owner: 'chaduhwan',
        repo: 'Project2',
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
          owner: 'chaduhwan',
          repo: 'Project2',
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
    <div className="mb-[2rem] flex flex-col gap-[2.8rem]">
      <ScanEntireFolder />
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
      <Button shape="rectangle" size="large" className="w-[24.7rem]" onClick={handleClickTrigger}>
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
