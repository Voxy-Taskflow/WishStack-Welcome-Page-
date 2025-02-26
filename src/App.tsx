import React, { useEffect, useRef, useState } from 'react';
import { Rocket, Star, Zap, Upload, Bell, ChevronDown } from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { WelcomePage } from './components/WelcomePage';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const starsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const targetDate = new Date('2025-03-10T00:00:00'); // Target date: March 10, 2025

  const calculateCountdown = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(difference / (1000 * 3600 * 24));
    const hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setCountdown({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    const interval = setInterval(calculateCountdown, 1000);

    // Calculate the countdown immediately on load
    calculateCountdown();

    return () => clearInterval(interval);
  }, []);

  const scrollToFeatures = () => {
    const startPosition = window.pageYOffset;
    const targetPosition = featuresRef.current?.offsetTop || 0;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start: number | null = null;

    function animation(currentTime: number) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    if (!starsRef.current || isLoggedIn) return;

    const stars = Array.from({ length: 50 }).map(() => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      return star;
    });

    stars.forEach(star => starsRef.current?.appendChild(star));

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        stars.forEach((star, index) => {
          const speed = (index % 3 + 1) * 0.5;
          star.style.transform = `translateY(${scrolled * speed}px)`;
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return <WelcomePage />;
  }

  return (
    <div className="night-sky">
      <div ref={starsRef} className="fixed inset-0 pointer-events-none" />
      <div className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 gradient-text">
            Join The Future
          </h1>

          {/* Countdown */}
          <div className="text-2xl text-white mb-8">
            <p>Countdown to March 10, 2025:</p>
            <p className="text-4xl font-bold">
              {countdown.days} Days {countdown.hours} Hours {countdown.minutes} Minutes {countdown.seconds} Seconds
            </p>
          </div>

          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white text-xl px-12 py-4 rounded-full transform transition hover:scale-105 flex items-center gap-2 mb-16"
          >
            <Rocket className="w-6 h-6" />
            Sign In Now
          </button>
          
          {/* Clickable Glowing Text with Arrow */}
          <button 
            onClick={scrollToFeatures}
            className="text-center group hover:scale-105 transform transition-transform duration-200 cursor-pointer"
          >
            <p className="glow-text text-2xl font-bold mb-4">Why Join Us?</p>
            <ChevronDown className="w-8 h-8 text-purple-400 bounce-arrow mx-auto group-hover:text-purple-300" />
          </button>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="min-h-screen bg-black/40 backdrop-blur-sm py-20 px-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 gradient-text">
            Why Should You Sign Up Now?
          </h2>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            {/* Feature 1 */}
            <div className="bg-purple-900/40 p-8 rounded-2xl backdrop-blur-sm hover:transform hover:scale-105 transition">
              <Star className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Get 1 Month Premium For Free</h3>
              <p className="text-purple-200">Experience all premium features without any commitment. Unlock the full potential of our platform.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-purple-900/40 p-8 rounded-2xl backdrop-blur-sm hover:transform hover:scale-105 transition">
              <Zap className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">First Access to Beta Features</h3>
              <p className="text-purple-200">Be among the first to try new features and shape the future of our platform.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-purple-900/40 p-8 rounded-2xl backdrop-blur-sm hover:transform hover:scale-105 transition">
              <Upload className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">5 Free Uploads Per Month</h3>
              <p className="text-purple-200">Start creating and sharing with 5 complimentary uploads every month.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-purple-900/40 p-8 rounded-2xl backdrop-blur-sm hover:transform hover:scale-105 transition">
              <Bell className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Special Access to Future Updates</h3>
              <p className="text-purple-200">Stay ahead of the curve with priority access to all upcoming features and improvements.</p>
            </div>
          </div>
        </section>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsLoggedIn(true)}
      />
    </div>
  );
}

export default App;
