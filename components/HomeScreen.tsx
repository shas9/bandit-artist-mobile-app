import React, { useState, useEffect } from 'react';
import { Play, DollarSign, Music, TrendingUp, Clock, MapPin, Settings, Zap, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useApp } from './AppContext';

export function HomeScreen() {
  const { artist, setCurrentScreen, currentGig, tips, requests } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sample data for today's stats and recent activity
  const todayStats = {
    tips: 47.50,
    requests: 8,
    avgTip: 5.94
  };

  const recentActivity = [
    { id: 1, type: 'tip', amount: 10, from: 'Sarah M.', message: 'Love your folk songs!', time: '2 min ago' },
    { id: 2, type: 'request', song: 'Blackbird', from: 'Mike R.', tip: 5, time: '5 min ago' },
    { id: 3, type: 'tip', amount: 15, from: 'Anonymous', message: '', time: '12 min ago' },
    { id: 4, type: 'request', song: 'Fast Car', from: 'Jessica L.', time: '20 min ago' },
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleStartGig = () => {
    if (currentGig) {
      setCurrentScreen('active-gig');
    } else {
      setCurrentScreen('start-gig');
    }
  };

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header with greeting and quick actions */}
      <div className="bg-gradient-bandit text-white px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 border-2 border-white/20">
              <AvatarImage src={artist.avatarUrl} alt={artist.name} />
              <AvatarFallback>{artist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white/80 text-sm">{getGreeting()}</p>
              <h1 className="text-xl font-bold">{artist.name}</h1>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen('profile')}
            className="text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Open settings"
          >
            <Settings size={20} />
          </Button>
        </div>

        {/* Current time and genre badge */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-white/80">
            <p className="text-sm">{currentTime.toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p className="text-lg font-semibold">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit'
              })}
            </p>
          </div>
          <Badge className="bg-bandit-jonquil text-black">
            {artist.genre}
          </Badge>
        </div>

        {/* Prominent Start Gig Section */}
        {!currentGig ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-bandit-tangerine rounded-full mb-3 shadow-lg">
                <Play size={28} className="text-white ml-1" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Ready to perform?</h2>
              <p className="text-white/80 text-sm">
                Start earning tips from your fans with one tap
              </p>
            </div>
            
            <Button
              onClick={handleStartGig}
              className="w-full bg-white text-bandit-teal hover:bg-white/90 font-semibold py-4 text-lg rounded-xl shadow-lg transform transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play size={20} className="mr-2" />
              Start New Gig
            </Button>

            <div className="flex items-center justify-center space-x-6 mt-4 text-white/70 text-xs">
              <div className="flex items-center space-x-1">
                <Zap size={12} />
                <span>Quick Setup</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin size={12} />
                <span>Auto Location</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star size={12} />
                <span>Live Tips</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-bandit-tangerine/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-bandit-tangerine/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-bandit-tangerine rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-white">LIVE NOW</span>
                </div>
                <h2 className="text-lg font-bold text-white">{currentGig.title}</h2>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">
                  ${tips.reduce((sum, tip) => sum + tip.amount, 0).toFixed(2)}
                </p>
                <p className="text-white/80 text-sm">earned so far</p>
              </div>
            </div>
            
            <Button
              onClick={handleStartGig}
              className="w-full bg-white text-bandit-teal hover:bg-white/90 font-semibold py-3 rounded-xl"
            >
              View Active Gig
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 -mt-4 pb-6">
        {/* Today's Performance */}
        <Card className="shadow-lg mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp size={20} className="mr-2 text-bandit-teal" />
                Today's Performance
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentScreen('analytics')}
                className="text-bandit-teal border-bandit-teal hover:bg-bandit-teal hover:text-white"
              >
                View Details
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-bandit-teal/10 rounded-full mx-auto mb-2">
                  <DollarSign size={20} className="text-bandit-teal" />
                </div>
                <p className="text-2xl font-bold text-bandit-teal">${todayStats.tips}</p>
                <p className="text-sm text-gray-600">Tips Earned</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-bandit-tangerine/10 rounded-full mx-auto mb-2">
                  <Music size={20} className="text-bandit-tangerine" />
                </div>
                <p className="text-2xl font-bold text-bandit-tangerine">{todayStats.requests}</p>
                <p className="text-sm text-gray-600">Song Requests</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-bandit-gamboge/10 rounded-full mx-auto mb-2">
                  <TrendingUp size={20} className="text-bandit-gamboge" />
                </div>
                <p className="text-2xl font-bold text-bandit-gamboge">${todayStats.avgTip}</p>
                <p className="text-sm text-gray-600">Avg Tip</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Suggestions */}
        {!currentGig && (
          <Card className="mb-6 bg-gradient-to-br from-bandit-columbia-blue/20 to-bandit-teal/20 border-bandit-teal/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Zap size={20} className="mr-2 text-bandit-teal" />
                Quick Start Options
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <Button
                onClick={handleStartGig}
                variant="outline"
                className="w-full justify-start text-left border-bandit-teal/30 hover:bg-bandit-teal hover:text-white group"
              >
                <MapPin size={16} className="mr-3 text-bandit-teal group-hover:text-white" />
                <div>
                  <p className="font-medium">Current Location</p>
                  <p className="text-sm text-gray-600 group-hover:text-white/80">
                    Start performing where you are now
                  </p>
                </div>
              </Button>
              
              <Button
                onClick={handleStartGig}
                variant="outline"
                className="w-full justify-start text-left border-bandit-teal/30 hover:bg-bandit-teal hover:text-white group"
              >
                <Clock size={16} className="mr-3 text-bandit-teal group-hover:text-white" />
                <div>
                  <p className="font-medium">Quick Setup</p>
                  <p className="text-sm text-gray-600 group-hover:text-white/80">
                    Fast track to going live in under 30 seconds
                  </p>
                </div>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'tip' 
                      ? 'bg-bandit-teal/10 text-bandit-teal' 
                      : 'bg-bandit-tangerine/10 text-bandit-tangerine'
                  }`}>
                    {activity.type === 'tip' ? <DollarSign size={16} /> : <Music size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    {activity.type === 'tip' ? (
                      <div>
                        <p className="font-medium text-gray-900">
                          ${activity.amount} tip from {activity.from}
                        </p>
                        {activity.message && (
                          <p className="text-sm text-gray-600 mt-1">"{activity.message}"</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium text-gray-900">
                          Song request: "{activity.song}"
                        </p>
                        <p className="text-sm text-gray-600">
                          From {activity.from}
                          {activity.tip && ` • $${activity.tip} tip included`}
                        </p>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
            
            {recentActivity.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Music size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">No recent activity</p>
                <p className="text-sm">
                  Start your first gig to see tips and requests here
                </p>
                <Button 
                  onClick={handleStartGig}
                  className="mt-4 bg-bandit-teal"
                >
                  Start Your First Gig
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}