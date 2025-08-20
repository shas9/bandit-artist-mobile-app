import React from 'react';
import { ArrowLeft, Calendar, Clock, DollarSign, Music, MapPin, Download, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useApp } from './AppContext';
import { toast } from 'sonner';

export function PastGigsScreen() {
  const { setCurrentScreen, trackEvent } = useApp();

  // QA Seed Data - 3 past gigs with totals
  const pastGigs = [
    {
      id: '1',
      title: 'Folk Festival Main Stage',
      venue: 'Riverside Folk Festival',
      date: '2024-10-15',
      duration: '2h 15m',
      totalTips: 189.50,
      tipCount: 23,
      requestCount: 8,
      avgTip: 8.24,
      status: 'completed'
    },
    {
      id: '2',
      title: 'Coffee House Sessions',
      venue: 'Luna Coffee Roasters',
      date: '2024-10-08',
      duration: '1h 45m',
      totalTips: 127.25,
      tipCount: 18,
      requestCount: 6,
      avgTip: 7.07,
      status: 'completed'
    },
    {
      id: '3',
      title: 'Street Corner Performance',
      venue: 'Main Street & 5th Ave',
      date: '2024-10-01',
      duration: '3h 00m',
      totalTips: 245.75,
      tipCount: 31,
      requestCount: 12,
      avgTip: 7.93,
      status: 'completed'
    }
  ];

  const handleExportCSV = (gigId: string) => {
    trackEvent('gig_export', { gig_id: gigId, format: 'csv' });
    toast.success('Gig data exported to CSV!');
  };

  const handleViewSummary = (gigId: string) => {
    trackEvent('gig_summary_view', { gig_id: gigId });
    toast.info('Gig summary opened');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalEarnings = pastGigs.reduce((sum, gig) => sum + gig.totalTips, 0);
  const totalTips = pastGigs.reduce((sum, gig) => sum + gig.tipCount, 0);
  const avgTipOverall = totalTips > 0 ? totalEarnings / totalTips : 0;

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
          <h1>Past Gigs</h1>
          <div className="w-8"></div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{pastGigs.length}</p>
            <p className="text-sm text-white/80">Total Gigs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">${totalEarnings.toFixed(0)}</p>
            <p className="text-sm text-white/80">Total Earned</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">${avgTipOverall.toFixed(2)}</p>
            <p className="text-sm text-white/80">Avg Tip</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-3 space-y-4 pb-6">
        {pastGigs.map((gig) => (
          <Card key={gig.id} className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{gig.title}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} aria-hidden="true" />
                      <span>{gig.venue}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} aria-hidden="true" />
                      <span>{formatDate(gig.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} aria-hidden="true" />
                      <span>{gig.duration}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {gig.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <p className="text-xl font-bold text-bandit-teal">${gig.totalTips}</p>
                  <p className="text-xs text-gray-500">Total Tips</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-bandit-tangerine">{gig.tipCount}</p>
                  <p className="text-xs text-gray-500">Tips Count</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-bandit-gamboge">{gig.requestCount}</p>
                  <p className="text-xs text-gray-500">Requests</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 min-h-11 focus:ring-2 focus:ring-bandit-teal/20"
                  onClick={() => handleViewSummary(gig.id)}
                  aria-label={`View summary for ${gig.title}`}
                >
                  <BarChart3 size={14} className="mr-1" aria-hidden="true" />
                  Summary
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 min-h-11 focus:ring-2 focus:ring-bandit-teal/20"
                  onClick={() => handleExportCSV(gig.id)}
                  aria-label={`Export data for ${gig.title}`}
                >
                  <Download size={14} className="mr-1" aria-hidden="true" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {pastGigs.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Music size={48} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No gigs yet</h3>
              <p className="text-gray-500 mb-4">
                Start your first gig to see your performance history here
              </p>
              <Button 
                onClick={() => setCurrentScreen('home')}
                className="bg-bandit-teal min-h-11 focus:ring-2 focus:ring-bandit-teal/20"
              >
                Start Your First Gig
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}