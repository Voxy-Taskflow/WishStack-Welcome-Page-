import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function WelcomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Update clock every second
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Update countdown
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const targetDate = new Date('2025-02-10T00:00:00').getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="night-sky min-h-screen flex flex-col items-center justify-center">
      <div ref={(ref) => {
        if (!ref) return;
        // Create stars dynamically
        Array.from({ length: 50 }).forEach(() => {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          star.style.width = `${Math.random() * 3}px`;
          star.style.height = star.style.width;
          ref.appendChild(star);
        });
      }} className="fixed inset-0 pointer-events-none" />

      <div className="text-center z-10">
        <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-8">
          You Have Joined<br />The Revolution
        </h1>

        <div className="bg-purple-900/40 p-8 rounded-2xl backdrop-blur-sm mb-8">
          <div className="flex items-center justify-center gap-4 text-purple-300 mb-4">
            <Clock className="w-8 h-8" />
            <span className="text-3xl font-mono">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="bg-purple-900/40 p-8 rounded-2xl backdrop-blur-sm">
          <h2 className="text-2xl text-purple-300 mb-4">Time Until Revolution</h2>
          <div className="text-4xl font-mono text-white glow-text">
            {timeLeft}
          </div>
        </div>
      </div>
    </div>
  );
}