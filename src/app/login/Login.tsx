'use client';

import { Ellipse } from '@/components/Ellipse';

export default function UiLogin() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Ellipse />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          height: '20.3rem',
          width: '140.6rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '20.3rem',
            width: '43.8rem',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <h1 className="text-primary-500" style={{ fontSize: '6rem' }}>
            Find your Flaw,
          </h1>

          <button
            type="button"
            className="border-primary-500 text-primary-500"
            style={{
              height: '11rem',
              width: '24rem',
              borderRadius: '999rem',
              border: '2px solid',
              fontSize: '6rem',
            }}
          >
            Login
          </button>
        </div>

        <button
          type="button"
          className="bg-primary-500 text-white"
          style={{
            height: '5.6rem',
            width: '35.4rem',
            borderRadius: '999rem',
            fontSize: '2.8rem',
          }}
        >
          Github로 연동 로그인하기
        </button>

        <button
          type="button"
          className="bg-primary-500 text-white"
          style={{
            height: '5.6rem',
            width: '12.2rem',
            borderRadius: '999rem',
            fontSize: '2.4rem',
          }}
        >
          Github
        </button>
      </div>
    </div>
  );
}
