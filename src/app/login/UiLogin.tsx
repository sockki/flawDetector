'use client';

export default function UiLogin() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-white">
      <div
        className="relative z-10 flex items-center justify-between"
        style={{ width: '140.6rem', height: '20.3rem' }}
      >
        <div
          className="flex flex-col items-center"
          style={{ width: '43.8rem', height: '20.3rem', gap: '2rem' }}
        >
          <h1
            className="text-primary-500"
            style={{
              fontSize: '6rem',
            }}
          >
            Find your Flaw,
          </h1>

          <button
            type="button"
            className="rounded-full border-2 border-primary-500 text-primary-500 transition-colors duration-300 hover:bg-primary-500 hover:text-white"
            style={{ width: '24rem', height: '11rem', fontSize: '6rem' }}
          >
            Login
          </button>
        </div>

        <button
          type="button"
          className="rounded-full bg-primary-500 text-white transition-colors duration-300 hover:bg-primary-500"
          style={{ width: '35.4rem', height: '5.6rem', fontSize: '2.8rem' }}
        >
          Github로 연동 로그인하기
        </button>

        <button
          type="button"
          className="rounded-full bg-primary-500 text-white transition-colors duration-300 hover:bg-primary-500"
          style={{ width: '12.2rem', height: '5.6rem', fontSize: '2.4rem' }}
        >
          Github
        </button>
      </div>
    </div>
  );
}
