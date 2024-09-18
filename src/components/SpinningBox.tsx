export default function SpinningBox() {
  return (
    <div className="relative flex h-screen items-center justify-center">
      <div className="relative h-screen max-h-[100vh] w-screen max-w-[100vh] rounded-full">
        <div
          className="absolute h-[20rem] w-[20rem] animate-rotate-around rounded-xl border-2 border-primary-500 bg-transparent"
          style={{ transform: 'rotate(0deg) translate(40vh)', animationDelay: '0s' }}
        />
        <div
          className="absolute h-[20rem] w-[20rem] animate-rotate-around rounded-xl border-2 border-primary-500 bg-transparent"
          style={{ transform: 'rotate(45deg) translate(40vh)', animationDelay: '-3.75s' }}
        />
        <div
          className="absolute h-[20rem] w-[20rem] animate-rotate-around rounded-xl border-2 border-primary-500 bg-transparent"
          style={{ transform: 'rotate(90deg) translate(40vh)', animationDelay: '-7.5s' }}
        />
        <div
          className="absolute h-[20rem] w-[20rem] animate-rotate-around rounded-xl border-2 border-primary-500 bg-transparent"
          style={{ transform: 'rotate(135deg) translate(40vh)', animationDelay: '-11.25s' }}
        />
        <div
          className="absolute h-[20rem] w-[20rem] animate-rotate-around rounded-xl border-2 border-primary-500 bg-transparent"
          style={{ transform: 'rotate(180deg) translate(40vh)', animationDelay: '-15s' }}
        />
        <div
          className="absolute h-[20rem] w-[20rem] animate-rotate-around rounded-xl border-2 border-primary-500 bg-transparent"
          style={{ transform: 'rotate(225deg) translate(40vh)', animationDelay: '-18.75s' }}
        />
        <div
          className="absolute h-[20rem] w-[20rem] animate-rotate-around rounded-xl border-2 border-primary-500 bg-transparent"
          style={{ transform: 'rotate(270deg) translate(40vh)', animationDelay: '-22.5s' }}
        />
        <div
          className="absolute h-[20rem] w-[20rem] animate-rotate-around rounded-xl border-2 border-primary-500 bg-transparent"
          style={{ transform: 'rotate(315deg) translate(40vh)', animationDelay: '-26.25s' }}
        />
      </div>
    </div>
  );
}
