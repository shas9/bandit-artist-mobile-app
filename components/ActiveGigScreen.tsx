import React, { useState, useEffect } from 'react';
import { ArrowLeft, QrCode, Share2, Square, DollarSign, Music, Pin, Check, RefreshCw, Users, Clock, Filter, Star, Wifi, WifiOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { useApp } from './AppContext';
import { toast } from 'sonner';

export function ActiveGigScreen() {
  const { 
    currentGig, 
    setCurrentGig, 
    setCurrentScreen, 
    tips, 
    setTips, 
    requests, 
    setRequests, 
    requestPreferences,
    isOffline,
    trackEvent 
  } = useApp();
  
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [gigDuration, setGigDuration] = useState(0);
  const [lastTipTime, setLastTipTime] = useState(Date.now());

  // Live simulation timers
  useEffect(() => {
    if (!currentGig) return;

    // Duration timer
    const durationTimer = setInterval(() => {
      setGigDuration(prev => prev + 1);
    }, 1000);

    // Tips simulation - every 20-40 seconds as specified in QA
    const tipTimer = setTimeout(() => {
      if (Date.now() - lastTipTime >= 20000) { // Minimum 20 seconds
        const amounts = [2, 5, 10, 15, 20, 25]; // Include QA tip presets
        const names = ['Sarah M.', 'Mike R.', 'Anonymous', 'Jessica L.', 'Tom W.', 'Anonymous', 'Lisa K.'];
        const messages = [
          'Love this folk song!',
          'Beautiful voice!',
          'Keep it up!',
          '',
          'Amazing performance',
          'More acoustic please!',
          'So talented!',
          ''
        ];

        const newTip = {
          id: Date.now().toString(),
          gigId: currentGig.id,
          ts: Date.now(),
          amount: amounts[Math.floor(Math.random() * amounts.length)],
          currency: 'USD',
          fanNameOpt: names[Math.floor(Math.random() * names.length)],
          messageOpt: messages[Math.floor(Math.random() * messages.length)],
          syncStatus: isOffline ? 'offline' : 'synced' as const
        };

        setTips(prev => [newTip, ...prev].slice(0, 20));
        setLastTipTime(Date.now());
        
        if (isOffline) {
          toast.success(`💰 Tip saved offline: $${newTip.amount} from ${newTip.fanNameOpt}`);
        } else {
          toast.success(`💰 New tip: $${newTip.amount} from ${newTip.fanNameOpt}`);
        }

        trackEvent('tip_received', {
          amount: newTip.amount,
          gig_id: currentGig.id,
          offline: isOffline
        });

        // Schedule next tip (20-40 seconds)
        const nextTipDelay = Math.random() * 20000 + 20000;
        setTimeout(() => setLastTipTime(Date.now() - 20000), nextTipDelay);
      }
    }, Math.random() * 20000 + 20000); // 20-40 seconds

    // Requests simulation - every 2-5 minutes
    const requestTimer = setInterval(() => {
      const songs = [
        'The Water is Wide',
        'Blackbird',
        'Both Sides Now',
        'Fire and Rain',
        'Vincent (Starry Starry Night)',
        'Mad World',
        'Hallelujah',
        'Big Yellow Taxi',
        'The Night We Met',
        'Fast Car'
      ];
      const names = ['Alex P.', 'Morgan S.', 'Chris T.', 'Jamie L.', 'Anonymous'];
      const notes = [
        'For my anniversary!',
        'My favorite folk song',
        '',
        'Please play this one',
        'Birthday request!',
        'Love this tune!'
      ];

      const songTitle = songs[Math.floor(Math.random() * songs.length)];
      const tipAmount = Math.random() > 0.6 ? [2, 5, 10, 15][Math.floor(Math.random() * 4)] : undefined;
      
      // Apply request filtering logic
      const shouldAcceptRequest = () => {
        if (requestPreferences.acceptAllRequests) return true;
        
        if (requestPreferences.requireTipForRequest) {
          if (!tipAmount || tipAmount < requestPreferences.minimumTipAmount) {
            return false;
          }
        }

        if (requestPreferences.blockedSongs.some(blocked => 
          songTitle.toLowerCase().includes(blocked.toLowerCase())
        )) {
          return false;
        }

        const note = notes[Math.floor(Math.random() * notes.length)];
        if (requestPreferences.blockedWords.some(word => 
          note.toLowerCase().includes(word.toLowerCase()) ||
          songTitle.toLowerCase().includes(word.toLowerCase())
        )) {
          return false;
        }

        return true;
      };

      if (shouldAcceptRequest()) {
        const isPreferred = requestPreferences.preferredSongs.some(preferred => 
          songTitle.toLowerCase().includes(preferred.toLowerCase())
        );

        const newRequest = {
          id: Date.now().toString(),
          gigId: currentGig.id,
          ts: Date.now(),
          title: songTitle,
          noteOpt: notes[Math.floor(Math.random() * notes.length)],
          tipAmountOpt: tipAmount,
          status: (isPreferred && requestPreferences.autoAcceptPreferred) ? 'pinned' : 'queued' as const,
          syncStatus: isOffline ? 'offline' : 'synced' as const
        };

        setRequests(prev => [newRequest, ...prev]);
        
        if (isPreferred) {
          toast.success(`⭐ Preferred song requested: ${songTitle}`);
        }

        trackEvent('request_received', {
          song: songTitle,
          tip_amount: tipAmount,
          gig_id: currentGig.id,
          preferred: isPreferred,
          offline: isOffline
        });
      }
    }, Math.random() * 180000 + 120000); // 2-5 minutes

    return () => {
      clearInterval(durationTimer);
      clearTimeout(tipTimer);
      clearInterval(requestTimer);
    };
  }, [currentGig, setTips, setRequests, requestPreferences, isOffline, lastTipTime, trackEvent]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTips = tips.reduce((sum, tip) => sum + tip.amount, 0);
  const avgTip = tips.length > 0 ? totalTips / tips.length : 0;
  const offlineTips = tips.filter(tip => tip.syncStatus === 'offline');

  const handleEndGig = () => {
    if (currentGig) {
      trackEvent('gig_end', {
        gig_id: currentGig.id,
        duration: gigDuration,
        total_tips: totalTips,
        tip_count: tips.length,
        request_count: requests.length
      });
    }
    
    setCurrentGig(null);
    setShowEndDialog(false);
    setCurrentScreen('home');
    toast.success('Gig ended successfully!');
  };

  const handleRequestAction = (requestId: string, action: 'pin' | 'done' | 'refund') => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: action === 'refund' ? 'refunded' : action === 'pin' ? 'pinned' : 'done' }
        : req
    ));
    
    const actionMessages = {
      pin: 'Request pinned to top',
      done: 'Request marked as done',
      refund: 'Request refunded'
    };
    
    toast.success(actionMessages[action]);

    trackEvent(`request_${action}`, { request_id: requestId });
  };

  const isPreferredSong = (songTitle: string) => {
    return requestPreferences.preferredSongs.some(preferred => 
      songTitle.toLowerCase().includes(preferred.toLowerCase())
    );
  };

  if (!currentGig) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>No active gig</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-bandit text-white px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen('home')}
            className="text-white hover:bg-white/10 focus:ring-2 focus:ring-white/20"
            aria-label="Go back to home"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-bandit-tangerine rounded-full animate-pulse"></div>
              <span className="text-sm">LIVE</span>
            </div>
            {isOffline && (
              <div className="flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1">
                <WifiOff size={12} />
                <span className="text-xs">Offline</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="mb-1">{currentGig.title}</h2>
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <Clock size={16} />
            <span>{formatDuration(gigDuration)}</span>
            {!requestPreferences.acceptAllRequests && (
              <>
                <span>•</span>
                <Filter size={16} />
                <span className="text-xs">Filtered</span>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold">${totalTips.toFixed(2)}</p>
            <p className="text-sm text-white/80">Total Tips</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{tips.length}</p>
            <p className="text-sm text-white/80">Tips Count</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{requests.length}</p>
            <p className="text-sm text-white/80">Requests</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            size="sm"
            className="flex-1 bg-white text-bandit-teal hover:bg-white/90 min-h-11 focus:ring-2 focus:ring-white/20"
            onClick={() => setCurrentScreen('qr')}
          >
            <QrCode size={16} className="mr-2" />
            Show QR
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 min-h-11 focus:ring-2 focus:ring-white/20"
          >
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 min-h-11 focus:ring-2 focus:ring-white/20"
            onClick={() => setShowEndDialog(true)}
          >
            <Square size={16} className="mr-2" />
            End
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Offline Status */}
        {offlineTips.length > 0 && (
          <Alert>
            <WifiOff size={16} />
            <AlertDescription>
              {offlineTips.length} tips saved offline. They'll sync when connection returns.
            </AlertDescription>
          </Alert>
        )}

        {/* Request Filtering Status */}
        {!requestPreferences.acceptAllRequests && (
          <Card className="border-bandit-teal/20 bg-bandit-teal/5">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-bandit-teal" />
                <div>
                  <p className="text-sm font-medium">Request Filtering Active</p>
                  <p className="text-xs text-gray-600">
                    {requestPreferences.requireTipForRequest && `Min tip: $${requestPreferences.minimumTipAmount} • `}
                    {requestPreferences.blockedSongs.length > 0 && `${requestPreferences.blockedSongs.length} blocked songs • `}
                    {requestPreferences.preferredSongs.length > 0 && `${requestPreferences.preferredSongs.length} preferred songs`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Live Feed */}
        <div className="space-y-4">
          {[...tips.map(tip => ({ type: 'tip', data: tip, ts: tip.ts })), 
            ...requests.map(req => ({ type: 'request', data: req, ts: req.ts }))]
            .sort((a, b) => b.ts - a.ts)
            .slice(0, 10)
            .map(item => (
            <Card key={`${item.type}-${item.data.id}`} className="animate-tip-in">
              <CardContent className="p-4">
                {item.type === 'tip' ? (
                  <div className="flex items-start space-x-3">
                    <div className="bg-bandit-teal/10 rounded-full p-2">
                      <DollarSign size={16} className="text-bandit-teal" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">${item.data.amount} from {item.data.fanNameOpt}</p>
                        <div className="flex items-center space-x-2">
                          {item.data.syncStatus === 'offline' && (
                            <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700">
                              Offline
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(item.data.ts).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      {item.data.messageOpt && (
                        <p className="text-sm text-gray-600 mt-1">"{item.data.messageOpt}"</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-3">
                    <div className="bg-bandit-tangerine/10 rounded-full p-2">
                      <Music size={16} className="text-bandit-tangerine" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">"{item.data.title}"</p>
                          {isPreferredSong(item.data.title) && (
                            <Star size={14} className="text-bandit-jonquil fill-current" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {item.data.tipAmountOpt && (
                            <Badge variant="secondary" className="text-xs">
                              +${item.data.tipAmountOpt}
                            </Badge>
                          )}
                          {item.data.syncStatus === 'offline' && (
                            <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700">
                              Offline
                            </Badge>
                          )}
                          <Badge 
                            variant={
                              item.data.status === 'pinned' ? 'default' :
                              item.data.status === 'done' ? 'secondary' :
                              item.data.status === 'refunded' ? 'destructive' :
                              'outline'
                            }
                            className={`text-xs ${
                              item.data.status === 'pinned' ? 'bg-bandit-jonquil text-white' :
                              item.data.status === 'done' ? 'bg-green-100 text-green-800' :
                              item.data.status === 'refunded' ? 'bg-red-100 text-red-800' :
                              ''
                            }`}
                          >
                            {item.data.status}
                          </Badge>
                        </div>
                      </div>
                      {item.data.noteOpt && (
                        <p className="text-sm text-gray-600 mb-2">"{item.data.noteOpt}"</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(item.data.ts).toLocaleTimeString()}
                        </span>
                        {item.data.status === 'queued' && (
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="min-h-8 min-w-8 focus:ring-2 focus:ring-bandit-teal/20"
                              onClick={() => handleRequestAction(item.data.id, 'pin')}
                              aria-label="Pin request"
                            >
                              <Pin size={12} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="min-h-8 min-w-8 focus:ring-2 focus:ring-bandit-teal/20"
                              onClick={() => handleRequestAction(item.data.id, 'done')}
                              aria-label="Mark as done"
                            >
                              <Check size={12} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="min-h-8 min-w-8 focus:ring-2 focus:ring-bandit-teal/20"
                              onClick={() => handleRequestAction(item.data.id, 'refund')}
                              aria-label="Refund request"
                            >
                              <RefreshCw size={12} />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* End Gig Dialog */}
      <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End Gig?</DialogTitle>
            <DialogDescription>
              Are you sure you want to end your gig? You've earned ${totalTips.toFixed(2)} from {tips.length} tips during this performance.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowEndDialog(false)}
              className="focus:ring-2 focus:ring-bandit-teal/20"
            >
              Keep Playing
            </Button>
            <Button 
              onClick={handleEndGig} 
              className="bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500/20"
            >
              End Gig
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}