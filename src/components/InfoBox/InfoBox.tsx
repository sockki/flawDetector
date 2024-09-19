'use client';

import { CopyCheckIcon, CopyCodeIcon } from '@/public/index';
import { useCodeFormatState } from '@/stores/useRepoDetailStore';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { twMerge } from 'tailwind-merge';

type InfoBoxProps = Issue & {
  theme: 'red' | 'primary' | 'gray';
  location?: boolean;
  bullet?: boolean;
  onLineClick: (lineNumber: number) => void;
};

const customCodeStyle = {
  fontSize: '2rem',
  backgroundColor: '#333333',
  color: '#ffffff',
  borderTopLeftRadius: '0',
  borderTopRightRadius: '0',
  borderBottomLeftRadius: '2rem',
  borderBottomRightRadius: '2rem',
  padding: '1.6rem',
  margin: 0,
  border: 0,
};

export default function InfoBox({
  theme,
  location,
  bullet,
  issue,
  vulnerability,
  number,
  modifiedCode,
  fixDetails,
  onLineClick,
}: InfoBoxProps) {
  const [isCopied, setIsCopied] = useState(false);

  const { codeType } = useCodeFormatState();
  const themeClasses = {
    bg: {
      red: 'bg-red-light',
      primary: 'bg-purple-light',
      gray: 'bg-gray-light',
    },
    title: {
      red: 'text-system-warning',
      primary: 'text-primary-500',
      gray: 'text-gray-black',
    },
    location: {
      red: 'border-system-warning text-system-warning border-[0.2rem]',
      primary: 'border-primary-500 text-primary-500 border-[0.2rem]',
      gray: 'border-gray-black text-gray-black border-[0.2rem]',
    },
    contentText: {
      gray: 'text-gray-dark',
    },
  };

  function formatCodeString(code: string) {
    return code
      .replace(/;/g, ';\n')
      .replace(/{/g, '{\n')
      .replace(/}/g, '\n}')
      .replace(/(\r\n|\r|\n){2,}/g, '\n');
  }

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2_000);
  };

  return (
    <div
      className={twMerge(
        themeClasses.bg[theme],
        'mb-[2rem] p-[3rem]',
        'rounded-lg',
        'flex flex-col gap-[3.2rem]',
        'h-fit w-[100rem]',
        'rounded-[1.2rem]',
      )}
    >
      <div className="flex flex-col gap-[0.8rem]">
        <div className="flex items-center gap-[1rem]">
          <h2 className={twMerge('text-[2.4rem] font-bold', themeClasses.title[theme])}>{issue}</h2>
          {location && (
            <button
              className={twMerge(
                'rounded-full px-[0.6rem] py-[0.3rem] text-[1.6rem] font-bold',
                themeClasses.location[theme],
              )}
              onClick={() => {
                onLineClick(number[0]);
              }}
              type="button"
            >
              위치보기
            </button>
          )}
        </div>
        <div className={twMerge(theme === 'gray' && themeClasses.contentText.gray)}>
          <ul className={twMerge('list-inside text-[1.8rem]', bullet ? 'list-disc' : 'list-none')}>
            <li className="ml-[2rem]">취약점 : {vulnerability}</li>
          </ul>
        </div>
      </div>
      <div className="text-[1.8rem]">{fixDetails}</div>

      <div>
        <div className="text-[2.4rem] font-bold">
          수정된 코드
          <div className="h-fit w-fit min-w-[70rem]">
            <div className="text-gray-ligh flex justify-between rounded-tl-[2rem] rounded-tr-[2rem] bg-black px-[1.6rem] py-[1.6rem] text-[1.8rem] text-gray-light">
              <div>{codeType}</div>
              <CopyToClipboard text={formatCodeString(modifiedCode)} onCopy={handleCopy}>
                <button type="button" className="flex items-center gap-[1rem]">
                  {isCopied ? <CopyCheckIcon /> : <CopyCodeIcon />}
                  {isCopied ? '복사완료' : '코드복사'}
                </button>
              </CopyToClipboard>
            </div>
            <SyntaxHighlighter
              style={oneDark}
              language={codeType}
              wrapLines
              customStyle={customCodeStyle}
              lineProps={{ style: { whiteSpace: 'pre-wrap' } }}
            >
              {formatCodeString(modifiedCode)}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
