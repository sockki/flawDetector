import { twMerge } from 'tailwind-merge';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useCodeFormatState } from '@/stores/Stroe';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyCodeIcon } from '@/public/index';

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
  padding: '1rem',
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

  return (
    <div
      className={twMerge(
        themeClasses.bg[theme],
        'mb-[2rem] p-[3rem]',
        'rounded-lg',
        'flex flex-col gap-[3.2rem]',
        'h-fit w-[148.6rem]',
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
        <div className="text-[3.2rem] font-bold">
          수정된 코드
          <div className="h-fit w-fit min-w-[70rem]">
            <div className="text-gray-ligh flex justify-between rounded-tl-[2rem] rounded-tr-[2rem] bg-neutral-80 px-[1.6rem] py-[2rem] text-[1.8rem] text-gray-light">
              <div>{codeType}</div>
              <CopyToClipboard text={formatCodeString(modifiedCode)}>
                <button type="button" className="flex gap-[1rem]">
                  <CopyCodeIcon />
                  코드복사
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
