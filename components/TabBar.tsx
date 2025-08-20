import React from 'react';
import { Home, BarChart3, Megaphone, User, Play } from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from './AppContext';

export function TabBar() {
  const { currentScreen, setCurrentScreen, currentGig } = useApp();

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'marketing', icon: Megaphone, label: 'Marketing' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  const handleStartGig = () => {
    if (currentGig) {
      setCurrentScreen('active-gig');
    } else {
      setCurrentScreen('start-gig');
    }
  };

  return (
    <div className="relative bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      {/* Regular tabs */}
      <div className="flex items-center justify-around relative">
        {tabs.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen(tab.id as any)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 min-h-16 transition-colors ${
                isActive 
                  ? 'text-bandit-teal' 
                  : 'text-gray-600 hover:text-bandit-teal'
              }`}
              aria-label={tab.label}
            >
              <Icon size={20} />
              <span className="text-xs">{tab.label}</span>
            </Button>
          );
        })}

        {/* Central Start Gig FAB */}
        <div className="flex-1 flex flex-col items-center relative">
          <Button
            onClick={handleStartGig}
            className="relative bg-gradient-bandit hover:bg-gradient-bandit-warm text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:scale-105 border-4 border-white mb-1"
            aria-label={currentGig ? "View Active Gig" : "Start New Gig"}
          >
            <div className="flex items-center justify-center">
              <Play size={20} className="ml-0.5" />
              {currentGig && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-bandit-tangerine rounded-full animate-pulse border border-white"></div>
              )}
            </div>
          </Button>
          
          {/* Text label with better visibility */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200/50">
              <span className="text-xs font-semibold text-bandit-teal whitespace-nowrap">
                {currentGig ? 'Live' : 'Start'}
              </span>
            </div>
          </div>
        </div>

        {tabs.slice(2, 4).map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen(tab.id as any)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 min-h-16 transition-colors ${
                isActive 
                  ? 'text-bandit-teal' 
                  : 'text-gray-600 hover:text-bandit-teal'
              }`}
              aria-label={tab.label}
            >
              <Icon size={20} />
              <span className="text-xs">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}