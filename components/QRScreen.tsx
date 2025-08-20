import React from 'react';
import { ArrowLeft, Copy, Share2, Camera, AlertCircle, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useApp } from './AppContext';
import { toast } from 'sonner';

export function QRScreen() {
  const { currentGig, setCurrentScreen, trackEvent } = useApp();

  const qrLink = currentGig ? `https://bandit.tips/${currentGig.id}` : 'https://bandit.tips/demo';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrLink);
    toast.success('Link copied to clipboard!');
    trackEvent('qr_link_copied', { gig_id: currentGig?.id });
  };

  const handleShare = () => {
    trackEvent('qr_share_initiated', { gig_id: currentGig?.id });
    
    if (navigator.share) {
      navigator.share({
        title: currentGig ? currentGig.title : 'Tip this artist',
        text: 'Support this amazing musician with a tip!',
        url: qrLink
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="h-full bg-gradient-bandit flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12 text-white">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentScreen(currentGig ? 'active-gig' : 'home')}
          className="text-white hover:bg-white/10 focus:ring-2 focus:ring-white/20"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-white font-semibold">Your QR Code</h2>
        <div className="w-8"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6">
        {/* QR Code */}
        <Card className="mb-6 shadow-2xl">
          <CardContent className="p-6">
            <div className="bg-white rounded-2xl p-6 flex items-center justify-center">
              {/* Mock QR Code - In production, this would be a real QR code */}
              <div className="w-48 h-48 bg-gradient-to-br from-bandit-teal to-bandit-tangerine rounded-lg flex items-center justify-center relative">
                <div className="grid grid-cols-8 gap-1 p-4">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-sm ${
                        Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                {/* Bandit logo in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-bandit-teal font-bold text-sm">B</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <div className="text-center mb-6 text-white max-w-sm">
          <div className="flex items-center justify-center mb-3">
            <Camera size={24} className="mr-2" />
            <h3 className="text-lg font-semibold">Fans scan with camera</h3>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            Your fans can scan this QR code with their phone's camera to tip you and request songs instantly. No app download required!
          </p>
        </div>

        {/* External Payment Compliance Warning */}
        <Alert className="mb-6 max-w-sm bg-white/10 border-white/20">
          <AlertCircle size={16} className="text-white" />
          <AlertDescription className="text-white text-sm">
            <strong>Payment Notice:</strong> Tips are processed directly by external payment providers 
            (Stripe, Venmo, etc.) and go straight to you. Apple is not involved in these transactions.
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3 mb-6">
          <Button
            size="lg"
            className="w-full bg-white text-bandit-teal hover:bg-white/90 font-semibold min-h-12 focus:ring-2 focus:ring-white/20"
            onClick={handleCopyLink}
          >
            <Copy size={20} className="mr-2" />
            Copy Link
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold min-h-12 focus:ring-2 focus:ring-white/20"
            onClick={handleShare}
          >
            <Share2 size={20} className="mr-2" />
            Share Link
          </Button>
        </div>

        {/* Link Display */}
        <div className="w-full max-w-sm">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
            <p className="text-white/80 text-xs mb-2">Your tip link:</p>
            <p className="text-white text-sm font-mono break-all bg-white/10 rounded px-2 py-1">
              {qrLink}
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-4 flex items-center text-white/60 text-xs">
          <Shield size={12} className="mr-1" />
          <span>Secure payments via Stripe & other providers</span>
        </div>
      </div>
    </div>
  );
}