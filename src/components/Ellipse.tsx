export function Ellipse(): React.ReactElement {
  const ellipses = [];
  const totalEllipses = 16;

  for (let i = 0; i < totalEllipses; i += 1) {
    ellipses.push(
      <div
        key={i}
        className="animate-spread"
        style={{
          animationDelay: `${i * 0.5}s`,
          width: '16.6rem',
          height: '5rem',
          top: '48.788rem',
          left: '87.741rem',
          border: '0.1rem solid var(--Primary-purple-50, #F2EBFF)',
          backgroundColor: 'transparent',
          borderRadius: '50% / 50%',
          position: 'absolute',
        }}
      />,
    );
  }

  return <>{ellipses}</>;
}
