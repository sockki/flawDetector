import Button from '../Button/Button';

type SingleButtonProps = {
  variant: 'singleButton';
  buttonText: string;
  onClick: () => void;
};

type DoubleButtonProps = {
  variant: 'doubleButton';
  buttonText: Record<'left' | 'right', string>;
  onClick: Record<'left' | 'right', () => void>;
};

type ModalButtonProps = SingleButtonProps | DoubleButtonProps;

export default function ModalButton({ variant, buttonText, onClick }: ModalButtonProps) {
  return (
    <div className="flex items-center justify-between gap-[1.2rem]">
      {variant === 'doubleButton' ? (
        <>
          <Button variant="outlined" shape="rectangle" onClick={onClick.left}>
            <p className="font-medium">{buttonText.left}</p>
          </Button>
          <Button shape="rectangle" onClick={onClick.right}>
            <p className="font-medium">{buttonText.right}</p>
          </Button>
        </>
      ) : (
        <Button variant="filled" shape="rectangle" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
