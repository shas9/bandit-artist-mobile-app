import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Music, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const timeRanges = [
  { label: 'Today', value: 'today' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'All Time', value: 'lifetime' }
];

export function AnalyticsScreen() {
  const [selectedRange, setSelectedRange] = useState('week');

  // Mock data
  const earningsData = [
    { day: 'Mon', tips: 45 },
    { day: 'Tue', tips: 67 },
    { day: 'Wed', tips: 89 },
    { day: 'Thu', tips: 123 },
    { day: 'Fri', tips: 156 },
    { day: 'Sat', tips: 234 },
    { day: 'Sun', tips: 189 }
  ];

  const hourlyData = [
    { hour: '6PM', tips: 12 },
    { hour: '7PM', tips: 23 },
    { hour: '8PM', tips: 45 },
    { hour: '9PM', tips: 67 },
    { hour: '10PM', tips: 89 },
    { hour: '11PM', tips: 56 },
    { hour: '12AM', tips: 34 }
  ];

  const topSongs = [
    { title: 'Wonderwall', requests: 23, tips: 145 },
    { title: 'Sweet Caroline', requests: 18, tips: 120 },
    { title: 'Hotel California', requests: 15, tips: 98 },
    { title: 'Don\'t Stop Believin\'', requests: 12, tips: 87 },
    { title: 'Bohemian Rhapsody', requests: 10, tips: 76 }
  ];

  const repeatSupporters = [
    { name: 'Sarah M.', tips: 8, total: 87 },
    { name: 'Mike R.', tips: 6, total: 65 },
    { name: 'Jessica L.', tips: 5, total: 45 },
    { name: 'Tom W.', tips: 4, total: 38 },
    { name: 'Lisa K.', tips: 3, total: 29 }
  ];

  const statsData = {
    today: { tips: 127.50, count: 12, avg: 10.63, requests: 8 },
    week: { tips: 945.25, count: 89, avg: 10.62, requests: 42 },
    month: { tips: 3250.75, count: 287, avg: 11.33, requests: 156 },
    lifetime: { tips: 12850.50, count: 1205, avg: 10.67, requests: 623 }
  };

  const currentStats = statsData[selectedRange];

  return (
    <div className="h-full bg-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-bandit text-white px-6 pt-12 pb-6">
        <h1 className="mb-4">Analytics</h1>
        
        {/* Time Range Selector */}
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              size="sm"
              variant={selectedRange === range.value ? "secondary" : "ghost"}
              onClick={() => setSelectedRange(range.value)}
              className={selectedRange === range.value 
                ? "bg-white text-bandit-teal" 
                : "text-white hover:bg-white/10"
              }
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="px-6 -mt-3 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-lg">
            <CardContent className="p-4 text-center">
              <DollarSign size={24} className="mx-auto text-bandit-teal mb-2" />
              <p className="text-2xl font-bold text-bandit-teal">${currentStats.tips}</p>
              <p className="text-sm text-gray-500">Total Tips</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="p-4 text-center">
              <Users size={24} className="mx-auto text-bandit-tangerine mb-2" />
              <p className="text-2xl font-bold text-bandit-tangerine">{currentStats.count}</p>
              <p className="text-sm text-gray-500">Tip Count</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="p-4 text-center">
              <TrendingUp size={24} className="mx-auto text-bandit-gamboge mb-2" />
              <p className="text-2xl font-bold text-bandit-gamboge">${currentStats.avg}</p>
              <p className="text-sm text-gray-500">Avg Tip</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="p-4 text-center">
              <Music size={24} className="mx-auto text-bandit-jonquil mb-2" />
              <p className="text-2xl font-bold text-bandit-jonquil">{currentStats.requests}</p>
              <p className="text-sm text-gray-500">Requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar size={20} className="mr-2 text-bandit-teal" />
              Earnings Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={earningsData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="tips" 
                  stroke="var(--bandit-teal)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--bandit-teal)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Peak Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock size={20} className="mr-2 text-bandit-tangerine" />
              Peak Tipping Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hourlyData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Bar dataKey="tips" fill="var(--bandit-tangerine)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Songs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Music size={20} className="mr-2 text-bandit-gamboge" />
              Top Requested Songs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topSongs.map((song, index) => (
                <div key={song.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{song.title}</p>
                      <p className="text-sm text-gray-600">{song.requests} requests</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-bandit-teal">${song.tips}</p>
                    <p className="text-xs text-gray-500">tips earned</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Repeat Supporters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users size={20} className="mr-2 text-bandit-jonquil" />
              Repeat Supporters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {repeatSupporters.map((supporter) => (
                <div key={supporter.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-bandit-columbia-blue rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-bandit-teal">
                        {supporter.name.split(' ')[0][0]}{supporter.name.split(' ')[1][0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{supporter.name}</p>
                      <p className="text-sm text-gray-600">{supporter.tips} tips</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-bandit-teal">${supporter.total}</p>
                    <p className="text-xs text-gray-500">total support</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}