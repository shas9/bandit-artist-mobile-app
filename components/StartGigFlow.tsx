import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Edit3, Play, AlertCircle, RefreshCw, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useApp } from './AppContext';
import { toast } from 'sonner';

export function StartGigFlow() {
  const { setCurrentScreen, setCurrentGig, isOffline, trackEvent } = useApp();
  const [step, setStep] = useState(1);
  const [gigTitle, setGigTitle] = useState('');
  const [venue, setVenue] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [startingGig, setStartingGig] = useState(false);

  // Auto-generate gig title based on location
  useEffect(() => {
    if (location && !gigTitle) {
      setGigTitle(`Live at ${venue || 'Current Location'}`);
    }
  }, [location, venue, gigTitle]);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      setIsGettingLocation(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        
        // Mock reverse geocoding for venue name
        const mockVenues = [
          'Central Park Bandshell',
          'Downtown Music Venue',
          'Coffee House Sessions',
          'Street Corner Performance',
          'Local Music Hall'
        ];
        setVenue(mockVenues[Math.floor(Math.random() * mockVenues.length)]);
        setIsGettingLocation(false);
        toast.success('Location found!');
        trackEvent('location_success', { method: 'gps' });
      },
      (error) => {
        let errorMessage = 'Unable to get your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Try manual entry.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
        }
        
        setLocationError(errorMessage);
        setIsGettingLocation(false);
        trackEvent('location_error', { error: error.code, message: errorMessage });
      },
      options
    );
  };

  const retryLocation = () => {
    setLocationError(null);
    getCurrentLocation();
  };

  const skipLocation = () => {
    setLocation({ lat: 0, lng: 0 }); // Default coordinates
    setVenue('Manual Entry');
    setStep(2);
    trackEvent('location_skip', {});
  };

  const handleStartGig = () => {
    if (!gigTitle.trim()) {
      toast.error('Please enter a gig title');
      return;
    }

    if (isOffline) {
      setNetworkError('Cannot start gig while offline. Please check your connection and try again.');
      return;
    }

    setStartingGig(true);
    setNetworkError(null);

    // Simulate network delay and potential failure
    const simulateNetworkCall = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 10% chance of network failure for QA testing
          if (Math.random() < 0.1) {
            reject(new Error('Network error: Unable to start gig. Please try again.'));
          } else {
            resolve(true);
          }
        }, 2000);
      });
    };

    simulateNetworkCall()
      .then(() => {
        const newGig = {
          id: Date.now().toString(),
          title: gigTitle.trim(),
          venue: venue || 'Unknown Venue',
          lat: location?.lat,
          lng: location?.lng,
          startTs: Date.now(),
          totals: {
            tips: 0,
            requests: 0,
            avgTip: 0
          }
        };

        setCurrentGig(newGig);
        setCurrentScreen('active-gig');
        toast.success('🎵 Gig started! Good luck!');
        
        trackEvent('gig_start', {
          gig_id: newGig.id,
          title: newGig.title,
          venue: newGig.venue,
          has_location: !!location
        });
      })
      .catch((error) => {
        setNetworkError(error.message);
        setStartingGig(false);
        trackEvent('gig_start_error', { error: error.message });
      });
  };

  const retryStartGig = () => {
    setNetworkError(null);
    handleStartGig();
  };

  return (
    <div className="h-full bg-background overflow-y-auto">
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
          <h1>Start New Gig</h1>
          <div className="w-8"></div>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`}></div>
          <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`}></div>
          <div className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-white' : 'bg-white/30'}`}></div>
        </div>
      </div>

      <div className="px-6 -mt-3 pb-6">
        {/* Step 1: Location */}
        {step === 1 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin size={20} className="mr-2 text-bandit-teal" />
                Set Your Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                Let fans know where you're performing so they can find you easily.
              </p>

              {locationError && (
                <Alert variant="destructive">
                  <AlertCircle size={16} />
                  <AlertDescription className="flex items-center justify-between">
                    <span>{locationError}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={retryLocation}
                      className="ml-2 min-h-8"
                    >
                      <RefreshCw size={14} className="mr-1" />
                      Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {location ? (
                <Alert>
                  <MapPin size={16} />
                  <AlertDescription>
                    <strong>Location found:</strong> {venue}
                    <br />
                    <span className="text-sm text-gray-600">
                      Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                    </span>
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="text-center space-y-4">
                  <Navigation size={48} className="mx-auto text-gray-400" />
                  <div>
                    <Button
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      className="bg-bandit-teal mb-3 min-h-11 focus:ring-2 focus:ring-bandit-teal/20"
                    >
                      {isGettingLocation ? (
                        <>
                          <RefreshCw size={16} className="mr-2 animate-spin" />
                          Getting Location...
                        </>
                      ) : (
                        <>
                          <MapPin size={16} className="mr-2" />
                          Use My Location
                        </>
                      )}
                    </Button>
                    <br />
                    <Button
                      variant="outline"
                      onClick={skipLocation}
                      className="focus:ring-2 focus:ring-bandit-teal/20"
                    >
                      Enter Manually
                    </Button>
                  </div>
                </div>
              )}

              {location && (
                <Button
                  onClick={() => setStep(2)}
                  className="w-full bg-bandit-teal min-h-11 focus:ring-2 focus:ring-bandit-teal/20"
                >
                  Continue
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Venue Details */}
        {step === 2 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit3 size={20} className="mr-2 text-bandit-teal" />
                Gig Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="venue">Venue Name</Label>
                <Input
                  id="venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Where are you performing?"
                  className="focus:ring-2 focus:ring-bandit-teal/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Gig Title</Label>
                <Input
                  id="title"
                  value={gigTitle}
                  onChange={(e) => setGigTitle(e.target.value)}
                  placeholder="Name your performance"
                  className="focus:ring-2 focus:ring-bandit-teal/20"
                />
                <p className="text-sm text-gray-500">
                  This will appear on your QR code and tip page
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 focus:ring-2 focus:ring-bandit-teal/20"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!gigTitle.trim()}
                  className="flex-1 bg-bandit-teal min-h-11 focus:ring-2 focus:ring-bandit-teal/20"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Ready to Go Live */}
        {step === 3 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play size={20} className="mr-2 text-bandit-teal" />
                Ready to Go Live?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="bg-gradient-bandit-warm text-white p-6 rounded-lg">
                  <h3 className="font-bold mb-2">{gigTitle}</h3>
                  <p className="text-white/90">📍 {venue}</p>
                </div>

                <p className="text-gray-600">
                  Once you go live, fans can start sending tips and song requests. 
                  Make sure you're ready to perform!
                </p>
              </div>

              {networkError && (
                <Alert variant="destructive">
                  <AlertCircle size={16} />
                  <AlertDescription className="flex items-center justify-between">
                    <span>{networkError}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={retryStartGig}
                      className="ml-2 min-h-8"
                    >
                      <RefreshCw size={14} className="mr-1" />
                      Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {isOffline && (
                <Alert variant="destructive">
                  <AlertCircle size={16} />
                  <AlertDescription>
                    You're currently offline. Please check your internet connection before starting a gig.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  disabled={startingGig}
                  className="flex-1 focus:ring-2 focus:ring-bandit-teal/20"
                >
                  Back
                </Button>
                <Button
                  onClick={handleStartGig}
                  disabled={startingGig || isOffline}
                  className="flex-1 bg-bandit-teal min-h-11 focus:ring-2 focus:ring-bandit-teal/20"
                >
                  {startingGig ? (
                    <>
                      <RefreshCw size={16} className="mr-2 animate-spin" />
                      Starting...
                    </>
                  ) : (
                    <>
                      <Play size={16} className="mr-2" />
                      Go Live!
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}