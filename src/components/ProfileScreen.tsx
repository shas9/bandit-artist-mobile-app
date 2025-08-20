import React, { useState } from 'react';
import { User, Settings, CreditCard, BarChart3, MessageSquare, HelpCircle, Shield, LogOut, Edit3, Camera, Bell, Eye, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { useApp } from './AppContext';
import { toast } from 'sonner';

export function ProfileScreen() {
  const { artist, setCurrentScreen, setIsAuthenticated, trackEvent } = useApp();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [locationTrackingEnabled, setLocationTrackingEnabled] = useState(true);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('auth');
    setShowLogoutDialog(false);
    toast.success('Logged out successfully');
    trackEvent('user_logout');
  };

  const profileMenuItems = [
    {
      id: 'payments',
      title: 'Payment Settings',
      description: 'Manage payout methods and preferences',
      icon: CreditCard,
      badge: artist.payoutStatus === 'verified' ? 'Verified' : 'Setup Required',
      badgeColor: artist.payoutStatus === 'verified' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      description: 'View your performance data',
      icon: BarChart3
    },
    {
      id: 'request-settings',
      title: 'Song Request Settings',
      description: 'Configure how you receive requests',
      icon: MessageSquare
    },
    {
      id: 'past-gigs',
      title: 'Past Gigs',
      description: 'View your performance history',
      icon: BarChart3
    },
    {
      id: 'legal',
      title: 'Legal & Privacy',
      description: 'Privacy policy, terms, and data rights',
      icon: Shield
    },
    {
      id: 'qa-testing',
      title: 'QA Testing Suite',
      description: 'Pre-launch testing and validation',
      icon: Shield,
      badge: 'Dev Only',
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'faq',
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: HelpCircle
    }
  ];

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-bandit text-white px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 focus:ring-2 focus:ring-white/50 transition-all duration-200 backdrop-blur-sm"
            onClick={() => toast.info('Edit profile coming soon!')}
            aria-label="Edit profile"
          >
            <Edit3 size={20} />
          </Button>
        </div>

        {/* Profile Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <Avatar className="w-20 h-20 border-4 border-white/20">
              <AvatarImage src={artist.avatarUrl} alt={artist.name} />
              <AvatarFallback className="text-2xl">
                {artist.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-bandit-tangerine hover:bg-bandit-gamboge p-0 text-white border-2 border-white shadow-lg focus:ring-2 focus:ring-white/50"
              onClick={() => toast.info('Photo upload coming soon!')}
              aria-label="Change profile photo"
            >
              <Camera size={14} />
            </Button>
          </div>
          <div>
            <h2 className="text-xl font-bold">{artist.name}</h2>
            <p className="text-white/80">{artist.email}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-bandit-jonquil text-black">
                {artist.genre}
              </Badge>
              <Badge 
                className={artist.payoutStatus === 'verified' 
                  ? 'bg-green-500/20 text-green-100' 
                  : 'bg-amber-500/20 text-amber-100'
                }
              >
                {artist.payoutStatus === 'verified' ? 'Verified Artist' : 'Setup Required'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="text-center text-white/80">
          <p className="mb-1">Member since October 2024</p>
          <p className="text-sm">Spreading music, one gig at a time 🎵</p>
        </div>
      </div>

      <div className="px-6 -mt-4 pb-6">
        {/* Privacy Controls */}
        <Card className="mb-6 border-bandit-teal/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye size={20} className="mr-2 text-bandit-teal" />
              Privacy Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="font-medium">Push Notifications</Label>
                <p className="text-sm text-gray-600">Receive tips and request notifications</p>
              </div>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics" className="font-medium">Performance Analytics</Label>
                <p className="text-sm text-gray-600">Help us improve with usage data</p>
              </div>
              <Switch
                id="analytics"
                checked={analyticsEnabled}
                onCheckedChange={setAnalyticsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="location" className="font-medium">Location Services</Label>
                <p className="text-sm text-gray-600">Auto-detect venue for gigs</p>
              </div>
              <Switch
                id="location"
                checked={locationTrackingEnabled}
                onCheckedChange={setLocationTrackingEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {profileMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full p-4 h-auto justify-start text-left hover:bg-gray-50 rounded-lg"
                    onClick={() => setCurrentScreen(item.id as any)}
                  >
                    <Icon size={20} className="mr-4 text-bandit-teal flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{item.title}</p>
                        {item.badge && (
                          <Badge className={`text-xs ${item.badgeColor || 'bg-gray-100 text-gray-700'}`}>
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* App Store Review Prompt */}
        <Card className="bg-bandit-columbia-blue/20 border-bandit-teal/30 mb-6">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="font-medium text-bandit-teal mb-2">Loving Bandit?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Help other musicians discover us by leaving a review on the App Store!
              </p>
              <Button
                size="sm"
                className="bg-bandit-teal"
                onClick={() => {
                  trackEvent('app_store_review_prompt_clicked');
                  toast.success('Thanks! Redirecting to App Store...');
                }}
              >
                Rate Bandit ⭐
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 focus:ring-2 focus:ring-red-500/20"
          onClick={() => setShowLogoutDialog(true)}
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out of your Bandit account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowLogoutDialog(false)}
              className="focus:ring-2 focus:ring-bandit-teal/20"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500/20"
            >
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}