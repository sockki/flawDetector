'use client';

import { ReadingGlassesIcon } from '@/public/index';
import { useCodeFormatState } from '@/stores/useRepoDetailStore';
import { useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { twMerge } from 'tailwind-merge';

type ScanFormatProps = {
  resultType?: boolean;
  highLightedLines?: number[];
  scrollToLine?: number | null;
};

const containerStyles = 'flex gap-[2.8rem]';
const formatStyles =
  'flex h-[102rem]  max-w-[148.4rem] items-center justify-center rounded-[0.8rem] border-[0.1rem] border-gray-middle bg-white overflow-y-auto';
const contentStyles =
  'flex flex-col items-center justify-center  gap-[2rem] text-[3.2rem] text-primary-500 max-w-[148.4rem] min-w-[100rem]';
const customCodeStyle = {
  width: '100rem',
  height: '100%',
  backgroundColor: '#ffffff',
  fontSize: '1.8rem',
  borderRadius: '0.8rem',
  padding: '1rem',
};

export function ScanFormat({
  resultType = false,
  highLightedLines,
  scrollToLine,
}: ScanFormatProps) {
  const { currentCode, codeType } = useCodeFormatState();

  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScrollToLine = (lineNumber: number) => {
    if (lineRefs.current[lineNumber - 1]) {
      lineRefs.current[lineNumber - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if (scrollToLine !== null && scrollToLine !== undefined) {
      handleScrollToLine(scrollToLine);
    }
  }, [scrollToLine]);

  return (
    <div className={containerStyles}>
      {currentCode ? (
        <div className={twMerge(formatStyles, resultType ? 'h-[55.5rem]' : '')}>
          <SyntaxHighlighter
            language={codeType}
            style={oneLight}
            showLineNumbers
            customStyle={customCodeStyle}
            codeTagProps={{
              style: { backgroundColor: 'white' },
            }}
            lineNumberStyle={{ paddingRight: '5rem' }}
            wrapLines
            lineProps={(lineNumber: number) => ({
              ref: (el: HTMLDivElement | null) => {
                lineRefs.current[lineNumber - 1] = el;
              },
              style: highLightedLines?.includes(lineNumber)
                ? { background: '#ffefef', display: 'block', width: '100%' }
                : { display: 'block', width: '100%' },
            })}
          >
            {currentCode}
          </SyntaxHighlighter>
        </div>
      ) : (
        <div className={twMerge(contentStyles, resultType ? 'h-[55.5rem]' : '')}>
          <ReadingGlassesIcon />
          파일을 선택하세요
        </div>
      )}
    </div>
  );
}
