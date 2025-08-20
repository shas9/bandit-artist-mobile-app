import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Shield, Check, AlertCircle, ExternalLink, DollarSign, Smartphone, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { useApp } from './AppContext';
import { toast } from 'sonner';

export function PaymentsScreen() {
  const { setCurrentScreen, artist, setArtist, trackEvent } = useApp();
  const [venmoHandle, setVenmoHandle] = useState('@lenahart');
  const [cashappHandle, setCashappHandle] = useState('$LenaHart');
  const [paypalEmail, setPaypalEmail] = useState('lena.hart@example.com');
  const [primaryPayout, setPrimaryPayout] = useState(artist.payoutProvider);
  const [showStripeDialog, setShowStripeDialog] = useState(false);
  const [stripeConnecting, setStripeConnecting] = useState(false);

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Bank transfers, cards (recommended)',
      icon: CreditCard,
      status: artist.payoutStatus,
      fees: '2.9% + 30¢',
      processingTime: '2-7 business days',
      supported: true
    },
    {
      id: 'venmo',
      name: 'Venmo',
      description: 'P2P payments via QR code',
      icon: Smartphone,
      status: venmoHandle ? 'verified' : 'not_connected',
      fees: 'Free for personal',
      processingTime: 'Instant',
      supported: true
    },
    {
      id: 'cashapp',
      name: 'Cash App',
      description: 'P2P payments via QR code',
      icon: DollarSign,
      status: cashappHandle ? 'verified' : 'not_connected',
      fees: 'Free for personal',
      processingTime: 'Instant',
      supported: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Email-based payments',
      icon: ExternalLink,
      status: paypalEmail ? 'verified' : 'not_connected',
      fees: '2.9% + fixed fee',
      processingTime: '1-3 business days',
      supported: true
    }
  ];

  const handleStripeConnect = () => {
    setStripeConnecting(true);
    trackEvent('payout_status_change', { provider: 'stripe', action: 'connect_attempt' });
    
    // Simulate connection process
    setTimeout(() => {
      setArtist(prev => ({ ...prev, payoutStatus: 'pending' as const }));
      setStripeConnecting(false);
      setShowStripeDialog(false);
      toast.success('Stripe connection initiated! Verification pending.');
      
      // Simulate verification after 3 seconds for QA testing
      setTimeout(() => {
        setArtist(prev => ({ ...prev, payoutStatus: 'verified' as const }));
        toast.success('Stripe account verified! You can now receive payouts.');
        trackEvent('payout_status_change', { provider: 'stripe', status: 'verified' });
      }, 3000);
    }, 2000);
  };

  const handlePayoutToggle = (providerId: string) => {
    setPrimaryPayout(providerId);
    setArtist(prev => ({ ...prev, payoutProvider: providerId }));
    toast.success(`Primary payout method changed to ${providerId}`);
    trackEvent('payout_method_change', { provider: providerId });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-bandit text-white px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen('profile')}
            className="text-white hover:bg-white/10 focus:ring-2 focus:ring-white/20"
            aria-label="Go back to profile"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1>Payment Settings</h1>
          <div className="w-8"></div>
        </div>
        <p className="text-white/80">
          Manage how you receive tips from your fans
        </p>
      </div>

      <div className="px-6 -mt-3 space-y-6 pb-6">
        {/* External Payment Warning - Apple Compliance */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle size={20} className="text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">External Payment Processing</p>
                <p className="text-sm text-amber-700 mt-1">
                  Tips are processed directly by external payment providers (Stripe, Venmo, etc.) 
                  and are not subject to Apple's in-app purchase system. Bandit does not receive 
                  any commission from these transactions.
                </p>
                <p className="text-xs text-amber-600 mt-2">
                  <strong>Important:</strong> All payments go directly to the performer. 
                  Apple is not responsible for any payment disputes or issues.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Shield size={20} className="text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Secure payments via Stripe</p>
                <p className="text-sm text-green-700 mt-1">
                  All payments are processed securely through Stripe's PCI-compliant infrastructure. 
                  Bandit never stores your payment information.
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="text-green-700 hover:text-green-800 p-0 h-auto mt-1"
                  onClick={() => window.open('https://stripe.com/docs/security', '_blank')}
                >
                  Learn about PCI compliance <ExternalLink size={12} className="ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary Payout Method */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Payout Method</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Choose your preferred method for receiving tip payouts
            </p>
            
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon size={20} className="text-gray-600" />
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                        <p className="text-xs text-gray-500">
                          {method.fees} • {method.processingTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={method.status === 'verified' ? 'default' : 'outline'}
                        className={method.status === 'verified' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {method.status === 'verified' ? 'Connected' : 
                         method.status === 'pending' ? 'Pending' : 'Not Connected'}
                      </Badge>
                      {method.status === 'verified' && (
                        <Switch
                          checked={primaryPayout === method.id}
                          onCheckedChange={() => handlePayoutToggle(method.id)}
                          aria-label={`Set ${method.name} as primary payout method`}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Stripe Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard size={20} className="mr-2" />
              Stripe Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  Status: {artist.payoutStatus === 'verified' ? 'Verified' : 'Pending'}
                </p>
                <p className="text-sm text-gray-600">
                  {artist.payoutStatus === 'verified' 
                    ? 'Your Stripe account is ready to receive payouts'
                    : 'Complete verification to receive bank transfers'
                  }
                </p>
              </div>
              <Badge 
                variant={artist.payoutStatus === 'verified' ? 'default' : 'outline'}
                className={artist.payoutStatus === 'verified' ? 'bg-green-100 text-green-800' : ''}
              >
                {artist.payoutStatus === 'verified' ? 'Verified' : 'Pending'}
              </Badge>
            </div>

            {artist.payoutStatus !== 'verified' && (
              <Dialog open={showStripeDialog} onOpenChange={setShowStripeDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-bandit-teal">
                    Connect Stripe Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connect Your Stripe Account</DialogTitle>
                    <DialogDescription>
                      Set up secure payment processing to receive tips directly to your bank account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Alert>
                      <Shield size={16} />
                      <AlertDescription>
                        <strong>Secure connection:</strong> Stripe handles all sensitive financial data. 
                        Bandit never sees your banking information.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">What you'll need:</h4>
                      <ul className="text-sm text-gray-600 space-y-1 ml-4">
                        <li>• Government-issued ID</li>
                        <li>• Bank account for payouts</li>
                        <li>• Tax identification number</li>
                        <li>• Business information (if applicable)</li>
                      </ul>
                    </div>
                    
                    <Alert>
                      <AlertCircle size={16} />
                      <AlertDescription>
                        <strong>KYC Requirements:</strong> Stripe requires identity verification 
                        to comply with financial regulations and prevent fraud.{' '}
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto text-bandit-teal"
                          onClick={() => window.open('https://stripe.com/docs/connect/kyc', '_blank')}
                        >
                          Learn more <ExternalLink size={12} className="ml-1" />
                        </Button>
                      </AlertDescription>
                    </Alert>

                    <Button 
                      onClick={handleStripeConnect} 
                      disabled={stripeConnecting}
                      className="w-full bg-bandit-teal"
                    >
                      {stripeConnecting ? 'Connecting...' : 'Continue to Stripe'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>

        {/* Alternative Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Alternative Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-gray-600">
              Add additional ways for fans to tip you directly
            </p>

            {/* Venmo */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Smartphone size={16} className="text-blue-600" />
                <Label htmlFor="venmo">Venmo Handle</Label>
              </div>
              <div className="flex space-x-2">
                <Input
                  id="venmo"
                  value={venmoHandle}
                  onChange={(e) => setVenmoHandle(e.target.value)}
                  placeholder="@username"
                  className="focus:ring-2 focus:ring-bandit-teal/20"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(venmoHandle, 'Venmo handle')}
                  className="min-w-11 focus:ring-2 focus:ring-bandit-teal/20"
                  aria-label="Copy Venmo handle"
                >
                  <Copy size={14} />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Fans can scan your Venmo QR code for instant payments
              </p>
            </div>

            {/* Cash App */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <DollarSign size={16} className="text-green-600" />
                <Label htmlFor="cashapp">Cash App Handle</Label>
              </div>
              <div className="flex space-x-2">
                <Input
                  id="cashapp"
                  value={cashappHandle}
                  onChange={(e) => setCashappHandle(e.target.value)}
                  placeholder="$username"
                  className="focus:ring-2 focus:ring-bandit-teal/20"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(cashappHandle, 'Cash App handle')}
                  className="min-w-11 focus:ring-2 focus:ring-bandit-teal/20"
                  aria-label="Copy Cash App handle"
                >
                  <Copy size={14} />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Fans can scan your Cash App QR code for instant payments
              </p>
            </div>

            {/* PayPal */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <ExternalLink size={16} className="text-blue-800" />
                <Label htmlFor="paypal">PayPal Email</Label>
              </div>
              <div className="flex space-x-2">
                <Input
                  id="paypal"
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="focus:ring-2 focus:ring-bandit-teal/20"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(paypalEmail, 'PayPal email')}
                  className="min-w-11 focus:ring-2 focus:ring-bandit-teal/20"
                  aria-label="Copy PayPal email"
                >
                  <Copy size={14} />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Fans can send payments directly to your PayPal account
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Shield size={20} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Your Security & Privacy</p>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• All payments are processed through secure, encrypted channels</li>
                  <li>• Bandit never stores your banking or payment information</li>
                  <li>• We comply with PCI DSS standards for payment security</li>
                  <li>• Your financial data is protected by industry-leading security measures</li>
                </ul>
                <p className="text-xs text-blue-600 mt-2">
                  <strong>Note:</strong> Bandit is not intended for collecting personally identifiable 
                  information (PII) or handling sensitive personal data beyond what's necessary for payments.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}