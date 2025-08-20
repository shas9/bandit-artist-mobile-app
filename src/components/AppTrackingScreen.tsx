import React, { useState } from 'react';
import { Eye, Shield, BarChart3, X, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useApp } from './AppContext';

interface AppTrackingScreenProps {
  onTrackingDecision: (allowed: boolean) => void;
}

export function AppTrackingScreen({ onTrackingDecision }: AppTrackingScreenProps) {
  const [isDeciding, setIsDeciding] = useState(false);
  const { trackEvent } = useApp();

  const handleTrackingDecision = (allow: boolean) => {
    setIsDeciding(true);
    trackEvent('app_tracking_transparency_response', { allowed: allow });
    
    // Simulate iOS ATT prompt delay
    setTimeout(() => {
      setIsDeciding(false);
      onTrackingDecision(allow);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl border-2">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            <Eye size={32} className="text-blue-600" />
          </div>
          <CardTitle className="text-xl text-gray-900">
            "Bandit" Would Like Permission to Track
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-4">
              This allows Bandit to provide you with personalized analytics 
              and improve your performance insights across different sessions.
            </p>
          </div>

          {/* What We Track */}
          <Alert className="bg-blue-50 border-blue-200">
            <BarChart3 size={16} className="text-blue-600" />
            <AlertDescription className="text-blue-800 text-sm">
              <strong>What we analyze:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Your gig performance patterns</li>
                <li>• Feature usage to improve the app</li>
                <li>• Crash reports for stability</li>
                <li>• Session analytics (time spent, screens visited)</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Privacy Assurance */}
          <Alert className="bg-green-50 border-green-200">
            <Shield size={16} className="text-green-600" />
            <AlertDescription className="text-green-800 text-sm">
              <strong>Your privacy is protected:</strong>
              <ul className="mt-2 space-y-1">
                <li>• No personal data is sold to third parties</li>
                <li>• No cross-app or website tracking</li>
                <li>• All data is aggregated and anonymized</li>
                <li>• You can opt-out anytime in Settings</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button
              onClick={() => handleTrackingDecision(true)}
              disabled={isDeciding}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              {isDeciding ? (
                <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Check size={16} className="mr-2" />
              )}
              Allow Tracking
            </Button>

            <Button
              onClick={() => handleTrackingDecision(false)}
              disabled={isDeciding}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
            >
              <X size={16} className="mr-2" />
              Ask App Not to Track
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              This choice can be changed later in Settings → Privacy & Security → 
              Tracking → Bandit
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}