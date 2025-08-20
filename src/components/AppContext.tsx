import React, { createContext, useContext } from 'react';
import { Screen } from '../App';

export interface Artist {
  id: string;
  name: string;
  email: string;
  genre: string;
  avatarUrl: string;
  bio: string;
  tipPresets: number[];
  currency: string;
  payoutProvider: string;
  payoutStatus: 'pending' | 'verified';
}

export interface Gig {
  id: string;
  title: string;
  venue: string;
  lat?: number;
  lng?: number;
  startTs: number;
  endTs?: number;
  totals: {
    tips: number;
    requests: number;
    avgTip: number;
  };
}

export interface Tip {
  id: string;
  gigId: string;
  ts: number;
  amount: number;
  currency: string;
  fanNameOpt?: string;
  messageOpt?: string;
  syncStatus?: 'synced' | 'pending' | 'offline';
}

export interface Request {
  id: string;
  gigId: string;
  ts: number;
  title: string;
  noteOpt?: string;
  tipAmountOpt?: number;
  status: 'queued' | 'pinned' | 'done' | 'refunded';
  syncStatus?: 'synced' | 'pending' | 'offline';
}

export interface RequestPreferences {
  acceptAllRequests: boolean;
  requireTipForRequest: boolean;
  minimumTipAmount: number;
  allowedGenres: string[];
  blockedWords: string[];
  preferredSongs: string[];
  blockedSongs: string[];
  autoAcceptPreferred: boolean;
  notificationsEnabled: boolean;
}

export interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (seen: boolean) => void;
  artist: Artist;
  setArtist: (artist: Artist) => void;
  currentGig: Gig | null;
  setCurrentGig: (gig: Gig | null) => void;
  tips: Tip[];
  setTips: (tips: Tip[]) => void;
  requests: Request[];
  setRequests: (requests: Request[]) => void;
  requestPreferences: RequestPreferences;
  setRequestPreferences: (preferences: RequestPreferences) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppContext.Provider');
  }
  return context;
};