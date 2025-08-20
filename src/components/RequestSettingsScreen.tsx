import React, { useState } from 'react';
import { ArrowLeft, Music, Shield, DollarSign, Plus, X, Volume2, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { useApp } from './AppContext';
import { toast } from 'sonner';

export function RequestSettingsScreen() {
  const { setCurrentScreen, requestPreferences, setRequestPreferences } = useApp();
  const [newGenre, setNewGenre] = useState('');
  const [newBlockedWord, setNewBlockedWord] = useState('');
  const [newPreferredSong, setNewPreferredSong] = useState('');
  const [newBlockedSong, setNewBlockedSong] = useState('');

  const musicGenres = [
    'Acoustic', 'Blues', 'Classical', 'Country', 'Electronic', 'Folk',
    'Hip Hop', 'Indie', 'Jazz', 'Pop', 'Rock', 'R&B', 'Reggae', 'Metal',
    'Punk', 'Alternative', 'Gospel', 'Funk', 'Latin', 'World Music'
  ];

  const handleSaveSettings = () => {
    toast.success('Request preferences saved!');
    setCurrentScreen('profile');
  };

  const addGenre = (genre: string) => {
    if (genre && !requestPreferences.allowedGenres.includes(genre)) {
      setRequestPreferences({
        ...requestPreferences,
        allowedGenres: [...requestPreferences.allowedGenres, genre]
      });
    }
  };

  const removeGenre = (genre: string) => {
    setRequestPreferences({
      ...requestPreferences,
      allowedGenres: requestPreferences.allowedGenres.filter(g => g !== genre)
    });
  };

  const addBlockedWord = () => {
    if (newBlockedWord.trim() && !requestPreferences.blockedWords.includes(newBlockedWord.trim().toLowerCase())) {
      setRequestPreferences({
        ...requestPreferences,
        blockedWords: [...requestPreferences.blockedWords, newBlockedWord.trim().toLowerCase()]
      });
      setNewBlockedWord('');
    }
  };

  const removeBlockedWord = (word: string) => {
    setRequestPreferences({
      ...requestPreferences,
      blockedWords: requestPreferences.blockedWords.filter(w => w !== word)
    });
  };

  const addPreferredSong = () => {
    if (newPreferredSong.trim() && !requestPreferences.preferredSongs.includes(newPreferredSong.trim())) {
      setRequestPreferences({
        ...requestPreferences,
        preferredSongs: [...requestPreferences.preferredSongs, newPreferredSong.trim()]
      });
      setNewPreferredSong('');
    }
  };

  const removePreferredSong = (song: string) => {
    setRequestPreferences({
      ...requestPreferences,
      preferredSongs: requestPreferences.preferredSongs.filter(s => s !== song)
    });
  };

  const addBlockedSong = () => {
    if (newBlockedSong.trim() && !requestPreferences.blockedSongs.includes(newBlockedSong.trim())) {
      setRequestPreferences({
        ...requestPreferences,
        blockedSongs: [...requestPreferences.blockedSongs, newBlockedSong.trim()]
      });
      setNewBlockedSong('');
    }
  };

  const removeBlockedSong = (song: string) => {
    setRequestPreferences({
      ...requestPreferences,
      blockedSongs: requestPreferences.blockedSongs.filter(s => s !== song)
    });
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
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1>Request Settings</h1>
          <div className="w-8"></div>
        </div>
        <p className="text-white/80">
          Customize how you receive song requests from fans
        </p>
      </div>

      <div className="px-6 -mt-3 space-y-6 pb-6">
        {/* General Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Music size={20} className="mr-2 text-bandit-teal" />
              General Request Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Accept All Requests</p>
                <p className="text-sm text-gray-600">Allow any song request from fans</p>
              </div>
              <Switch
                checked={requestPreferences.acceptAllRequests}
                onCheckedChange={(checked) => 
                  setRequestPreferences({ ...requestPreferences, acceptAllRequests: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-Accept Preferred Songs</p>
                <p className="text-sm text-gray-600">Automatically pin requests for your preferred songs</p>
              </div>
              <Switch
                checked={requestPreferences.autoAcceptPreferred}
                onCheckedChange={(checked) => 
                  setRequestPreferences({ ...requestPreferences, autoAcceptPreferred: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Request Notifications</p>
                <p className="text-sm text-gray-600">Get notified when new requests come in</p>
              </div>
              <Switch
                checked={requestPreferences.notificationsEnabled}
                onCheckedChange={(checked) => 
                  setRequestPreferences({ ...requestPreferences, notificationsEnabled: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Tip Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign size={20} className="mr-2 text-bandit-tangerine" />
              Tip Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Require Tip for Requests</p>
                <p className="text-sm text-gray-600">Only accept requests that include a tip</p>
              </div>
              <Switch
                checked={requestPreferences.requireTipForRequest}
                onCheckedChange={(checked) => 
                  setRequestPreferences({ ...requestPreferences, requireTipForRequest: checked })
                }
              />
            </div>

            {requestPreferences.requireTipForRequest && (
              <div className="space-y-2">
                <Label htmlFor="minimum-tip">Minimum Tip Amount ($)</Label>
                <Input
                  id="minimum-tip"
                  type="number"
                  min="1"
                  value={requestPreferences.minimumTipAmount}
                  onChange={(e) => 
                    setRequestPreferences({ 
                      ...requestPreferences, 
                      minimumTipAmount: parseInt(e.target.value) || 0 
                    })
                  }
                  className="w-24"
                />
                <p className="text-xs text-gray-500">
                  Requests with tips below this amount will be automatically declined
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Genre Filtering */}
        {!requestPreferences.acceptAllRequests && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Volume2 size={20} className="mr-2 text-bandit-gamboge" />
                Allowed Genres
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Select which music genres you're willing to perform. Leave empty to allow all genres.
              </p>
              
              <div className="space-y-2">
                <Select onValueChange={addGenre}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add a genre..." />
                  </SelectTrigger>
                  <SelectContent>
                    {musicGenres
                      .filter(genre => !requestPreferences.allowedGenres.includes(genre))
                      .map(genre => (
                        <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {requestPreferences.allowedGenres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {requestPreferences.allowedGenres.map(genre => (
                    <Badge key={genre} variant="secondary" className="flex items-center gap-1">
                      {genre}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => removeGenre(genre)}
                      >
                        <X size={12} />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Preferred Songs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Music size={20} className="mr-2 text-bandit-teal" />
              Preferred Songs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Add songs you love to perform. These will be automatically pinned when requested.
            </p>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Song title..."
                value={newPreferredSong}
                onChange={(e) => setNewPreferredSong(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPreferredSong()}
              />
              <Button onClick={addPreferredSong} size="sm">
                <Plus size={16} />
              </Button>
            </div>

            {requestPreferences.preferredSongs.length > 0 && (
              <div className="space-y-2">
                {requestPreferences.preferredSongs.map(song => (
                  <div key={song} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <span className="text-sm">{song}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePreferredSong(song)}
                      className="h-6 w-6 p-0 text-gray-500"
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Blocked Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield size={20} className="mr-2 text-red-500" />
              Blocked Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Blocked Songs */}
            <div className="space-y-3">
              <div>
                <Label>Blocked Songs</Label>
                <p className="text-sm text-gray-600">Songs you don't want to be requested</p>
              </div>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Song to block..."
                  value={newBlockedSong}
                  onChange={(e) => setNewBlockedSong(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addBlockedSong()}
                />
                <Button onClick={addBlockedSong} size="sm" variant="outline">
                  <Plus size={16} />
                </Button>
              </div>

              {requestPreferences.blockedSongs.length > 0 && (
                <div className="space-y-2">
                  {requestPreferences.blockedSongs.map(song => (
                    <div key={song} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm">{song}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBlockedSong(song)}
                        className="h-6 w-6 p-0 text-red-500"
                      >
                        <X size={12} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Blocked Words */}
            <div className="space-y-3">
              <div>
                <Label>Blocked Words/Phrases</Label>
                <p className="text-sm text-gray-600">Filter out requests containing these words</p>
              </div>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Word or phrase..."
                  value={newBlockedWord}
                  onChange={(e) => setNewBlockedWord(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addBlockedWord()}
                />
                <Button onClick={addBlockedWord} size="sm" variant="outline">
                  <Plus size={16} />
                </Button>
              </div>

              {requestPreferences.blockedWords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {requestPreferences.blockedWords.map(word => (
                    <Badge key={word} variant="destructive" className="flex items-center gap-1">
                      {word}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 text-white hover:text-red-100"
                        onClick={() => removeBlockedWord(word)}
                      >
                        <X size={12} />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          onClick={handleSaveSettings}
          size="lg"
          className="w-full bg-bandit-teal"
        >
          Save Request Settings
        </Button>

        {/* Help Text */}
        <Card className="bg-bandit-columbia-blue/20 border-bandit-teal/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Bell size={16} className="text-bandit-teal mt-0.5" />
              <div>
                <p className="text-sm font-medium">How Request Filtering Works</p>
                <p className="text-xs text-gray-600 mt-1">
                  When fans make requests, they'll be automatically filtered based on your preferences. 
                  Blocked content won't appear in your request feed, while preferred songs will be highlighted 
                  and can be auto-pinned for easy access during your performance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}