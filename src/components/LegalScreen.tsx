import React, { useState } from 'react';
import { ArrowLeft, Shield, FileText, Trash2, ExternalLink, AlertTriangle, Eye, Lock, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { useApp } from './AppContext';
import { toast } from 'sonner';

export function LegalScreen() {
  const { setCurrentScreen, artist, trackEvent } = useApp();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAccountDeletion = () => {
    if (deleteConfirmText !== 'DELETE MY ACCOUNT') {
      toast.error('Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }

    setIsDeleting(true);
    trackEvent('account_deletion_initiated');

    // Simulate account deletion process
    setTimeout(() => {
      toast.success('Account deletion request submitted. You will receive a confirmation email.');
      setShowDeleteDialog(false);
      setDeleteConfirmText('');
      setIsDeleting(false);
      trackEvent('account_deletion_completed');
    }, 2000);
  };

  const openExternalLink = (url: string, title: string) => {
    trackEvent('legal_link_clicked', { url, title });
    window.open(url, '_blank');
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
          <h1>Legal & Privacy</h1>
          <div className="w-8"></div>
        </div>
        <p className="text-white/80">
          Your privacy and data rights
        </p>
      </div>

      <div className="px-6 -mt-3 space-y-6 pb-6">
        {/* Privacy & Data Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield size={20} className="mr-2 text-bandit-teal" />
              Privacy & Data Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-left focus:ring-2 focus:ring-bandit-teal/20"
                onClick={() => openExternalLink('https://bandit-app.com/privacy', 'Privacy Policy')}
              >
                <Eye size={16} className="mr-3 text-bandit-teal" />
                <div>
                  <p className="font-medium">Privacy Policy</p>
                  <p className="text-sm text-gray-600">
                    How we collect, use, and protect your data
                  </p>
                </div>
                <ExternalLink size={14} className="ml-auto text-gray-400" />
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left focus:ring-2 focus:ring-bandit-teal/20"
                onClick={() => openExternalLink('https://bandit-app.com/terms', 'Terms of Service')}
              >
                <FileText size={16} className="mr-3 text-bandit-teal" />
                <div>
                  <p className="font-medium">Terms of Service</p>
                  <p className="text-sm text-gray-600">
                    Legal agreement for using Bandit
                  </p>
                </div>
                <ExternalLink size={14} className="ml-auto text-gray-400" />
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-left focus:ring-2 focus:ring-bandit-teal/20"
                onClick={() => openExternalLink('https://bandit-app.com/support', 'Support')}
              >
                <Globe size={16} className="mr-3 text-bandit-teal" />
                <div>
                  <p className="font-medium">Support Center</p>
                  <p className="text-sm text-gray-600">
                    Get help and contact our team
                  </p>
                </div>
                <ExternalLink size={14} className="ml-auto text-gray-400" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Storage Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Lock size={20} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Your Data Storage</p>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• <strong>Profile data:</strong> Stored securely on our servers with encryption</li>
                  <li>• <strong>Payment information:</strong> Processed by Stripe, never stored by Bandit</li>
                  <li>• <strong>Location data:</strong> Used only during active gigs, not permanently stored</li>
                  <li>• <strong>Analytics:</strong> Aggregated performance data for your insights only</li>
                </ul>
                <p className="text-xs text-blue-600 mt-2">
                  <strong>Note:</strong> All data transmission uses HTTPS with TLS 1.3 encryption. 
                  We comply with GDPR and CCPA regulations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Tracking Transparency */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye size={20} className="mr-2 text-bandit-teal" />
              App Tracking & Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p className="mb-3">
                Bandit uses minimal analytics to improve your experience:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Performance analytics (crash reporting, load times)</li>
                <li>• Feature usage (which screens you use most)</li>
                <li>• Gig analytics (your personal performance data only)</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                We do not track you across other apps or websites. 
                No third-party advertising networks are used.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <Trash2 size={20} className="mr-2" />
              Account Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle size={16} />
              <AlertDescription>
                <strong>Account Deletion:</strong> This action cannot be undone. 
                All your data, gig history, and earnings records will be permanently deleted.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                If you delete your account, we will:
              </p>
              <ul className="text-sm text-gray-600 ml-4 space-y-1">
                <li>• Permanently delete your profile and preferences</li>
                <li>• Remove all gig history and analytics data</li>
                <li>• Cancel any pending payouts (completed payouts are not affected)</li>
                <li>• Disconnect all linked payment methods</li>
                <li>• Send you a confirmation email within 24 hours</li>
              </ul>
            </div>

            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
              className="w-full focus:ring-2 focus:ring-red-500/20"
            >
              <Trash2 size={16} className="mr-2" />
              Delete My Account
            </Button>
          </CardContent>
        </Card>

        {/* App Version Info */}
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="text-center text-sm text-gray-600">
              <p>Bandit v1.0.0 (Build 1)</p>
              <p>© 2024 Bandit Music Technologies</p>
              <p className="mt-2">
                Made with ❤️ for musicians everywhere
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Deletion Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-700">Delete Account</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your data will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle size={16} />
              <AlertDescription>
                To confirm deletion, type <strong>"DELETE MY ACCOUNT"</strong> below:
              </AlertDescription>
            </Alert>

            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Type DELETE MY ACCOUNT"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />

            <div className="text-sm text-gray-600">
              <p className="mb-2">This will immediately:</p>
              <ul className="ml-4 space-y-1">
                <li>• Delete your profile: {artist.name} ({artist.email})</li>
                <li>• Remove all gig history and analytics</li>
                <li>• Disconnect payment methods</li>
                <li>• Cancel pending payouts</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowDeleteDialog(false);
                setDeleteConfirmText('');
              }}
              className="focus:ring-2 focus:ring-bandit-teal/20"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleAccountDeletion}
              disabled={deleteConfirmText !== 'DELETE MY ACCOUNT' || isDeleting}
              className="focus:ring-2 focus:ring-red-500/20"
            >
              {isDeleting ? 'Deleting...' : 'Delete Account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}