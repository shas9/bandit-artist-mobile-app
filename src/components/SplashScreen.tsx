import React from 'react';
import { Music, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from './AppContext';

export function SplashScreen() {
  const { setCurrentScreen, hasSeenOnboarding, isAuthenticated } = useApp();

  const handleGetStarted = () => {
    if (!hasSeenOnboarding) {
      setCurrentScreen('onboarding');
    } else if (!isAuthenticated) {
      setCurrentScreen('auth');
    } else {
      setCurrentScreen('home');
    }
  };

  return (
    <div className="h-full bg-gradient-bandit flex flex-col items-center justify-center px-8 text-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 rotate-12">
          <Music size={40} className="text-white" />
        </div>
        <div className="absolute top-40 right-8 -rotate-12">
          <Zap size={32} className="text-white" />
        </div>
        <div className="absolute bottom-40 left-16 rotate-45">
          <Music size={24} className="text-white" />
        </div>
        <div className="absolute bottom-20 right-20 -rotate-45">
          <Zap size={28} className="text-white" />
        </div>
      </div>

      {/* Logo Area */}
      <div className="relative z-10 mb-8">
        <div className="mb-6 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
            <Music size={48} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-white mb-2 tracking-wider">BANDIT</h1>
        <div className="w-16 h-1 bg-white mx-auto mb-6 rounded-full"></div>
      </div>

      {/* Tagline */}
      <div className="relative z-10 mb-12">
        <p className="text-white/90 text-lg mb-2">
          Empowering Musicians,
        </p>
        <p className="text-white/90 text-lg">
          One Tip at a Time.
        </p>
      </div>

      {/* CTA Button */}
      <div className="relative z-10 w-full max-w-sm">
        <Button 
          onClick={handleGetStarted}
          size="lg"
          className="w-full bg-white text-bandit-teal hover:bg-white/90 shadow-lg"
        >
          Get Started
        </Button>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-bandit-warm"></div>
    </div>
  );
}