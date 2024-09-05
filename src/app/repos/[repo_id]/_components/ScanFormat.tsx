'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ReadingGlassesIcon } from '@/public/index';
import { useCodeFormatState } from '@/stores/Stroe';

const containerStyles = 'flex gap-[2.8rem]';
const formatStyles =
  'flex h-[131rem] w-[148.4rem] items-center justify-center rounded-[0.8rem] border-[0.1rem] border-[#c3c3c3] bg-white overflow-y-auto'; // Changed 'over-scroll-y' to 'overflow-y-auto'
const contentStyles = 'flex flex-col items-center gap-[2rem] text-[3.2rem] text-primary-500';
const customCodeStyle = {
  width: '148.4rem',
  height: '131rem',
  backgroundColor: '#ffffff', // 우선순위 강제
  fontSize: '2.5rem',
  borderRadius: '0.8rem',
  padding: '1rem',
};

export function ScanFormat() {
  const { currentCode, codeType } = useCodeFormatState();

  return (
    <div className={containerStyles}>
      <div className={formatStyles}>
        {currentCode ? (
          <SyntaxHighlighter
            language={codeType}
            style={oneLight}
            showLineNumbers
            customStyle={customCodeStyle}
            codeTagProps={{
              style: { backgroundColor: 'white' },
            }}
            lineNumberStyle={{ paddingRight: '5rem' }}
          >
            {currentCode}
          </SyntaxHighlighter>
        ) : (
          <div className={contentStyles}>
            <ReadingGlassesIcon />
            파일을 선택하세요
          </div>
        )}
      </div>
    </div>
  );
}
