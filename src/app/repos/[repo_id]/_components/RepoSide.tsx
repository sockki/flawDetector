'use client';

import { getRepoContents } from '@/apis/repos/repository';
import { useQuery } from '@tanstack/react-query';
import { FolderItem } from '@/components/List/FolderItem';
import { FileItem } from '@/components/List/FileItem';
import { ListHeader } from '@/components/List/ListHeader';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { ScanButton } from './ScanButton';
import { ScanStatus } from './ScanStatus';
import { ScanEntireFolder } from './ScanEntireFolder';

export function RepoSide() {
  const [currentData, setCurrentData] = useState<RepositoryContentsProps[]>([]);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [lastPath, setLastPath] = useState<string[]>([]);

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

  function handleControl() {
    setIsFileSelected(prev => !prev);
  }

  const handleFolderClick = (folderPath: string) => {
    setLastPath(prev => [...prev, currentPath]);
    setCurrentPath(folderPath);
  };

  const handleFileClick = () => {};

  const handleMultipleSelect = () => {};

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
        <ListHeader onFileSelect={() => handleControl} />
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
              className="mr-[0.6rem] cursor-pointer text-[#c3c3c3] hover:underline"
              onClick={() => handleFolderClick('')}
            >
              All Files
            </div>
            {pathSegments.map((segment, index) => {
              const partialPath = pathSegments.slice(0, index + 1).join('/');
              return (
                <span key={segment} className="flex items-center">
                  <span className="mx-[0.3rem]">/</span> {/* '/'와 세그먼트 간 여백을 조정 */}
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
                  onFileClick={isFileSelected ? () => handleMultipleSelect : () => handleFileClick}
                />
              ),
            )}
        </div>
      </div>
      <ScanButton />
    </div>
  );
}
