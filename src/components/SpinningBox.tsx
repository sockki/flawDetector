export default function SpinningBox() {
  const numBoxes = 8;
  const boxSize = '20rem';
  const translateDistance = '40vh';

  return (
    <div className="relative flex h-screen items-center justify-center">
      <div className="relative h-screen max-h-[100vh] w-screen max-w-[100vh] rounded-full">
        {Array.from({ length: numBoxes }, (_, index) => {
          const rotation = index * (360 / numBoxes);
          const delay = -(index * (30 / numBoxes));

          return (
            <div
              key={index}
              className="absolute animate-rotate-around rounded-xl border-2 border-primary-500 bg-transparent"
              style={{
                width: boxSize,
                height: boxSize,
                transform: `rotate(${rotation}deg) translate(${translateDistance})`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
