import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type FloatingButtonProps = {
  type: 'top' | 'ask';
  onClick?: () => void;
};

export function FloatingButton({ type, onClick }: FloatingButtonProps) {
  const handleClick = () => {
    if (type === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (type === 'ask' && onClick) {
      onClick();
    }
  };

  const iconSrc = type === 'top' ? '/icons/floatVector.svg' : '/icons/floatChat.svg';
  const iconAlt = type === 'top' ? 'Top Icon' : 'Chat Icon';
  const iconSize = type === 'top' ? 32 : 35;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(
        'group fixed bottom-4 flex h-[7.6rem] w-[7.6rem] items-center justify-center rounded-full shadow-lg focus:outline-none',
        'border border-primary-500 bg-white text-primary-500 hover:border-primary-500 hover:bg-primary-500 hover:text-white',
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={iconSize}
          height={iconSize}
          className="group-hover:brightness-0 group-hover:invert group-hover:filter"
        />
        {type === 'top' && <span className="text-[1.5rem] font-bold">TOP</span>}
      </div>
    </button>
  );
}
