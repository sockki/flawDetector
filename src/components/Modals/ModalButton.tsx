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
          <Button variant="outlined" onClick={onClick.left}>
            {buttonText.left}
          </Button>
          <Button onClick={onClick.right}>{buttonText.right}</Button>
        </>
      ) : (
        <Button variant="filled" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
