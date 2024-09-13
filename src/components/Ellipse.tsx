export function Ellipse() {
  return (
    <div className="w-screen overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => {
        const key = `line-${i}`;
        return (
          <div
            key={key}
            className="top absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 transform animate-spread rounded-l-[50%] rounded-r-[50%] border border-primary-50"
            style={{
              animationDelay: `${i * -0.5}s`,
            }}
          />
        );
      })}
    </div>
  );
}
