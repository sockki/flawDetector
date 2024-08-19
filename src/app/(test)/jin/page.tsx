'use client';

import { FloatingButton } from '../../../components/Floating/FloatingButton';

export default function HomeApp() {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center">Welcome to Home App</h1>
        <p className="mt-4 text-center text-lg">
          Scroll down to test the &quot;Top&quot; button functionality.
        </p>

        <div className="mt-8 space-y-4">
          {Array.from({ length: 50 }, (_, i) => (
            <p key={i} className="text-center">
              Content Line {i + 1}
            </p>
          ))}
        </div>
      </div>

      {/* Floating button for scrolling to top */}
      <FloatingButton type="top" />

      {/* Floating button for chat functionality */}
      <FloatingButton type="ask" />
    </div>
  );
}
