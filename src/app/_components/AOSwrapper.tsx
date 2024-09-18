'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { PropsWithChildren, useEffect } from 'react';

export default function AOSWrapper({ children }: PropsWithChildren) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return <>{children}</>;
}