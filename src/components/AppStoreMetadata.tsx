import React from 'react';
import { Play, DollarSign, Music, QrCode, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function AppStoreMetadata() {
  return (
    <div className="space-y-8 p-6">
      {/* App Store Description */}
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-bandit-teal mb-4">Bandit</h1>
        <h2 className="text-xl text-gray-700 mb-6">Tip your favorite musicians</h2>
        
        <div className="space-y-4 text-gray-600">
          <p>
            Bandit empowers street performers and live musicians to earn tips digitally. 
            Simply show your QR code, and fans can tip you instantly using their preferred payment method.
          </p>
          
          <p>
            <strong>Perfect for:</strong>
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Buskers and street performers</li>
            <li>Coffee shop musicians</li>
            <li>Open mic performers</li>
            <li>Festival artists</li>
            <li>Any live musician wanting digital tips</li>
          </ul>
          
          <p>
            <strong>Key Features:</strong>
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>🎵 Instant QR code generation for tips</li>
            <li>💰 Multiple payment options (Stripe, Venmo, CashApp, PayPal)</li>
            <li>🎶 Song request system with tips</li>
            <li>📊 Performance analytics and insights</li>
            <li>📱 Works offline - syncs when back online</li>
            <li>🔒 Secure payments via industry-leading providers</li>
          </ul>
          
          <p>
            <strong>How it works:</strong>
          </p>
          <ol className="list-decimal ml-6 space-y-1">
            <li>Start your gig with location auto-detection</li>
            <li>Display your unique QR code</li>
            <li>Fans scan and tip instantly</li>
            <li>Receive song requests with optional tips</li>
            <li>Track your earnings in real-time</li>
            <li>Get paid directly to your account</li>
          </ol>
          
          <p>
            Bandit puts the power back in musicians' hands. No more relying on cash-only tips 
            or missing out on digital payments. Start earning more from your performances today!
          </p>
          
          <p className="text-sm text-gray-500">
            <strong>Note:</strong> All payments are processed by external providers and go directly to performers. 
            Bandit does not take any commission from tips.
          </p>
        </div>
      </div>

      {/* Keywords for App Store */}
      <div>
        <h3 className="text-lg font-semibold mb-2">App Store Keywords</h3>
        <p className="text-sm text-gray-600">
          music, tips, busking, live, gigs, street performer, musician, digital tips, QR code, 
          song requests, performance, earnings, Stripe, payments, street music, live music, 
          concerts, festivals, open mic, coffee shop, acoustic, indie, folk
        </p>
      </div>

      {/* Screenshot Mockups */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Screenshot Descriptions</h3>
        
        <div className="grid gap-6">
          {/* Screenshot 1: Splash/Home */}
          <Card className="p-4">
            <h4 className="font-medium mb-2">Screenshot 1: Welcome & Home</h4>
            <div className="bg-gradient-bandit rounded-lg p-6 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">B</span>
              </div>
              <h2 className="text-xl font-bold mb-2">Welcome to Bandit</h2>
              <p className="text-white/80 mb-6">Start earning tips from your live performances</p>
              <Button className="bg-white text-bandit-teal font-semibold">
                <Play size={16} className="mr-2" />
                Start New Gig
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Show the welcoming home screen with clear call-to-action
            </p>
          </Card>

          {/* Screenshot 2: QR Code */}
          <Card className="p-4">
            <h4 className="font-medium mb-2">Screenshot 2: QR Code Display</h4>
            <div className="bg-gradient-bandit rounded-lg p-6 text-white text-center">
              <div className="bg-white rounded-lg p-6 mx-auto mb-4 max-w-64">
                <div className="w-48 h-48 bg-gradient-to-br from-bandit-teal to-bandit-tangerine rounded-lg mx-auto flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-white rounded-sm" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/80">Fans scan with camera to tip you instantly</p>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Highlight the core QR code functionality
            </p>
          </Card>

          {/* Screenshot 3: Live Gig */}
          <Card className="p-4">
            <h4 className="font-medium mb-2">Screenshot 3: Live Gig Feed</h4>
            <div className="bg-background rounded-lg p-4 border">
              <div className="bg-gradient-bandit text-white p-4 rounded-t-lg mb-4">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-2 h-2 bg-bandit-tangerine rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm">LIVE</span>
                </div>
                <div className="text-center">
                  <h3 className="font-bold">Coffee Shop Session</h3>
                  <p className="text-2xl font-bold">$47.50</p>
                  <p className="text-white/80">Total Tips</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-bandit-teal/10 p-2 rounded-full">
                    <DollarSign size={16} className="text-bandit-teal" />
                  </div>
                  <div>
                    <p className="font-medium">$10 from Sarah M.</p>
                    <p className="text-sm text-gray-600">"Beautiful voice!"</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-bandit-tangerine/10 p-2 rounded-full">
                    <Music size={16} className="text-bandit-tangerine" />
                  </div>
                  <div>
                    <p className="font-medium">Song request: "Blackbird"</p>
                    <p className="text-sm text-gray-600">From Mike R. • $5 tip included</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Show real-time tips and requests during performance
            </p>
          </Card>

          {/* Screenshot 4: Analytics */}
          <Card className="p-4">
            <h4 className="font-medium mb-2">Screenshot 4: Analytics Dashboard</h4>
            <div className="bg-background rounded-lg p-4 border">
              <h3 className="font-bold text-bandit-teal mb-4 flex items-center">
                <BarChart3 size={20} className="mr-2" />
                Your Performance
              </h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-bandit-teal/10 rounded-lg">
                  <p className="text-2xl font-bold text-bandit-teal">$284</p>
                  <p className="text-sm text-gray-600">This Month</p>
                </div>
                <div className="text-center p-3 bg-bandit-tangerine/10 rounded-lg">
                  <p className="text-2xl font-bold text-bandit-tangerine">12</p>
                  <p className="text-sm text-gray-600">Gigs</p>
                </div>
                <div className="text-center p-3 bg-bandit-gamboge/10 rounded-lg">
                  <p className="text-2xl font-bold text-bandit-gamboge">$7.50</p>
                  <p className="text-sm text-gray-600">Avg Tip</p>
                </div>
              </div>
              
              <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">📊 Earnings Chart</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Detailed analytics to track performance trends
            </p>
          </Card>

          {/* Screenshot 5: Payment Setup */}
          <Card className="p-4">
            <h4 className="font-medium mb-2">Screenshot 5: Payment Settings</h4>
            <div className="bg-background rounded-lg p-4 border">
              <h3 className="font-bold text-bandit-teal mb-4">Payment Methods</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-xs">💳</span>
                    </div>
                    <div>
                      <p className="font-medium">Stripe</p>
                      <p className="text-sm text-gray-600">Bank transfers, cards</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                      <span className="text-xs">📱</span>
                    </div>
                    <div>
                      <p className="font-medium">Venmo</p>
                      <p className="text-sm text-gray-600">P2P payments</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Multiple secure payment options for maximum convenience
            </p>
          </Card>
        </div>
      </div>

      {/* Age Rating Information */}
      <div>
        <h3 className="text-lg font-semibold mb-2">App Store Age Rating</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-medium text-blue-900">Recommended: 12+</p>
          <p className="text-sm text-blue-800 mt-2">
            <strong>Reasons:</strong>
          </p>
          <ul className="list-disc ml-6 text-sm text-blue-800 space-y-1">
            <li>Involves financial transactions (digital payments)</li>
            <li>User-generated content (song requests, tip messages)</li>
            <li>Location services usage</li>
            <li>Social interaction between performers and fans</li>
          </ul>
        </div>
      </div>

      {/* Privacy and Legal Requirements */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Required Legal Documents</h3>
        <div className="grid gap-4">
          <Card className="p-4">
            <h4 className="font-medium text-green-700">✅ Privacy Policy URL</h4>
            <p className="text-sm text-gray-600 mt-1">
              https://bandit-app.com/privacy
            </p>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-medium text-green-700">✅ Terms of Service URL</h4>
            <p className="text-sm text-gray-600 mt-1">
              https://bandit-app.com/terms
            </p>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-medium text-green-700">✅ Support URL</h4>
            <p className="text-sm text-gray-600 mt-1">
              https://bandit-app.com/support
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}