import React from 'react';
import InfoBox from '../../../components/InfoBox/InfoBox'; // InfoBox 컴포넌트의 경로를 맞게 설정하세요.

function App() {
  const themes = ['red', 'primary', 'gray'] as const;
  const configurations = [
    { location: true, bullet: true },
    { location: true, bullet: false },
    { location: false, bullet: true },
    { location: false, bullet: false },
  ];

  return (
    <div className="App">
      {themes.map(theme =>
        configurations.map(({ location, bullet }) => (
          <InfoBox
            theme={theme}
            location={location}
            bullet={bullet}
            description={[
              `${theme} 테마의 설명 1`,
              `${theme} 테마의 설명 2`,
              `${theme} 테마의 설명 3`,
            ]}
          />
        )),
      )}
    </div>
  );
}

export default App;
