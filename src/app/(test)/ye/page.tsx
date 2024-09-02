'use client';

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'yyyyy',
          name: '영은',
        }),
      });
      const data = await response.json();
      setMessage(data.message);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>파이어베이스 상태</h1>
      <p>{message}</p>
    </div>
  );
}
