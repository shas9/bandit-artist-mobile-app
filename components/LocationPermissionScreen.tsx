import React, { useState } from 'react';
import { MapPin, AlertCircle, Shield, Navigation, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useApp } from './AppContext';

interface LocationPermissionScreenProps {
  onPermissionGranted: (location: { lat: number; lng: number }) => void;
  onPermissionDenied: () => void;
  onSkip: () => void;
}

export function LocationPermissionScreen({ 
  onPermissionGranted, 
  onPermissionDenied, 
  onSkip 
}: LocationPermissionScreenProps) {
  const [isRequesting, setIsRequesting] = useState(false);
  const { trackEvent } = useApp();

  const requestLocationPermission = () => {
    setIsRequesting(true);
    trackEvent('location_permission_requested');

    if (!navigator.geolocation) {
      onPermissionDenied();
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsRequesting(false);
        trackEvent('location_permission_granted');
        onPermissionGranted({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        setIsRequesting(false);
        let errorMessage = '';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            trackEvent('location_permission_denied', { reason: 'user_denied' });
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            trackEvent('location_permission_denied', { reason: 'unavailable' });
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            trackEvent('location_permission_denied', { reason: 'timeout' });
            break;
        }
        
        console.log('Location error:', errorMessage);
        onPermissionDenied();
      },
      options
    );
  };

  return (
    <div className="min-h-screen bg-gradient-bandit flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-bandit-teal/10 rounded-full flex items-center justify-center">
            <MapPin size={32} className="text-bandit-teal" />
          </div>
          <CardTitle className="text-2xl text-gray-900">
            Enable Location Services
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center text-gray-600">
            <p className="mb-4">
              Bandit needs access to your location to help fans find your performances 
              and automatically set your venue information.
            </p>
          </div>

          {/* Purpose Explanation - Required for iOS */}
          <Alert>
            <Shield size={16} />
            <AlertDescription>
              <strong>How we use your location:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Automatically detect your performance venue</li>
                <li>• Show your location to potential fans nearby</li>
                <li>• Improve gig discovery in your area</li>
                <li>• Pre-fill venue names for convenience</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Alert className="bg-blue-50 border-blue-200">
            <Navigation size={16} className="text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Privacy Promise:</strong> Your location is only used during active gigs 
              and is never stored permanently or shared with third parties. 
              You can disable this anytime in Settings.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button
              onClick={requestLocationPermission}
              disabled={isRequesting}
              className="w-full bg-bandit-teal hover:bg-bandit-teal/90 py-3 text-lg"
            >
              {isRequesting ? (
                <>
                  <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Requesting Permission...
                </>
              ) : (
                <>
                  <MapPin size={20} className="mr-2" />
                  Allow Location Access
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={onSkip}
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Enter Location Manually
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              You can change location permissions anytime in your device Settings → 
              Privacy & Security → Location Services → Bandit
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}