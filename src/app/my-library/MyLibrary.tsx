'use client';

import { Ellipse } from '@/components/Ellipse';

export default function MyComponent() {
  return (
    <div>
      <div
        style={{
          position: 'relative',
          height: '102.4rem',
          width: '192rem',
          backgroundColor: 'white',
        }}
      >
        <Ellipse />
        <main
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            minHeight: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2rem',
                }}
              >
                <h1
                  className="text-primary-500"
                  style={{
                    textAlign: 'center',
                    fontSize: '6rem',
                    fontWeight: 'normal',
                    lineHeight: '7.261rem',
                    letterSpacing: '0.015em',
                  }}
                >
                  containing code files
                </h1>
                <div
                  style={{
                    display: 'flex',
                    height: '11rem',
                    width: '47rem',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    borderRadius: '999rem',
                    borderWidth: '0.4rem',
                    borderColor: '#5B21B6',
                    paddingLeft: '4rem',
                    paddingRight: '4rem',
                  }}
                >
                  <span
                    className="text-primary-500"
                    style={{
                      textAlign: 'center',
                      fontSize: '6rem',
                      fontWeight: 'normal',
                      lineHeight: '7.261rem',
                      letterSpacing: '0.015em',
                    }}
                  >
                    MY Library
                  </span>
                </div>
              </div>
              <h1
                className="text-primary-500"
                style={{
                  textAlign: 'center',
                  fontSize: '2rem',
                  fontWeight: 'normal',
                  lineHeight: '2.42rem',
                  letterSpacing: '-0.01em',
                }}
              >
                깃허브와 연동하여 내 코드 파일을 불러오세요.
              </h1>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <button
                type="button"
                className="bg-primary-500 text-white"
                style={{
                  display: 'flex',
                  height: '5.6rem',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  borderRadius: '999rem',
                  paddingLeft: '2.4rem',
                  paddingRight: '2.4rem',
                  fontSize: '2.8rem',
                  fontWeight: '300',
                  lineHeight: '3.389rem',
                  letterSpacing: '-0.01em',
                }}
              >
                Login
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
