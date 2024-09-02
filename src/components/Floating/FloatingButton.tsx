import { ChatIcon, TopIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';

type FloatingButtonProps = {
  type: 'top' | 'ask';
  onClick?: () => void;
  className?: string;
};

export function FloatingButton({ type, onClick, className }: FloatingButtonProps) {
  const handleClickTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const IconComponent = type === 'top' ? TopIcon : ChatIcon;

  return (
    <button
      type="button"
      onClick={type === 'top' ? handleClickTop : onClick}
      className={twMerge(
        'group fixed bottom-[7rem] right-[8rem] z-50 flex h-[7.6rem] w-[7.6rem] flex-col items-center justify-center gap-[0.8rem] rounded-full border-[0.14rem] border-primary-500 bg-white text-primary-500 hover:border-primary-500 hover:bg-primary-500 hover:text-white focus:outline-none',
        className,
      )}
    >
      <IconComponent className="fill-primary-500 group-hover:fill-white" />
      {type === 'top' && <span className="text-[1.5rem] font-bold">TOP</span>}
    </button>
  );
}
