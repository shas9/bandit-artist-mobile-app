import { 
  Smartphone, 
  Users, 
  Play, 
  CreditCard, 
  Shield, 
  Palette, 
  BarChart3, 
  Store, 
  Bug, 
  FileCheck 
} from 'lucide-react';
import { TestCategory } from './types';

export const createTestCategories = (): TestCategory[] => [
  {
    id: 'core-stability',
    name: 'Core Stability Tests',
    icon: Smartphone,
    description: 'Test app stability, crashes, and performance across devices',
    priority: 'critical',
    tests: [
      { id: 'ios16-launch', name: 'iOS 16 Device Launch', status: 'pending', message: 'Test app launch on iOS 16 devices' },
      { id: 'ios17-launch', name: 'iOS 17 Device Launch', status: 'pending', message: 'Test app launch on iOS 17 devices' },
      { id: 'screen-sizes', name: 'Multiple Screen Sizes', status: 'pending', message: 'Test iPhone SE, 14, 15 Pro Max compatibility' },
      { id: 'stress-test', name: '50+ Tips Stress Test', status: 'pending', message: 'Process 50+ tips in single session' },
      { id: 'offline-handling', name: 'Offline/Poor Network', status: 'pending', message: 'Test graceful offline handling' },
      { id: 'memory-usage', name: 'Memory Usage', status: 'pending', message: 'Monitor memory consumption during usage' },
      { id: 'crash-detection', name: 'Crash Detection', status: 'pending', message: 'Detect any app crashes or freezes' }
    ]
  },
  {
    id: 'onboarding-accounts',
    name: 'Onboarding & Accounts',
    icon: Users,
    description: 'Test user authentication, onboarding, and account management',
    priority: 'critical',
    tests: [
      { id: 'signup-flow', name: 'Sign-Up Flow', status: 'pending', message: 'Test complete user registration' },
      { id: 'login-flow', name: 'Login Flow', status: 'pending', message: 'Test user authentication' },
      { id: 'logout-flow', name: 'Logout Flow', status: 'pending', message: 'Test sign-out functionality' },
      { id: 'password-reset', name: 'Password Reset', status: 'pending', message: 'Test password recovery process' },
      { id: 'onboarding-steps', name: 'Onboarding Steps', status: 'pending', message: 'Verify 3-step onboarding flow' },
      { id: 'account-deletion', name: 'Account Deletion', status: 'pending', message: 'Test in-app account deletion' },
      { id: 'profile-creation', name: 'Profile Creation', status: 'pending', message: 'Test complete profile setup' },
      { id: 'qr-generation', name: 'QR Code Generation', status: 'pending', message: 'Test QR code creation process' }
    ]
  },
  {
    id: 'gig-session',
    name: 'Gig Session Flow',
    icon: Play,
    description: 'Test core gig functionality and location services',
    priority: 'critical',
    tests: [
      { id: 'start-gig-auto', name: 'Start Gig - Auto Location', status: 'pending', message: 'Test automatic location detection' },
      { id: 'start-gig-manual', name: 'Start Gig - Manual Location', status: 'pending', message: 'Test manual location entry' },
      { id: 'gig-timer', name: 'Gig Timer Functions', status: 'pending', message: 'Test start/stop timer functionality' },
      { id: 'location-permissions', name: 'Location Permissions', status: 'pending', message: 'Test location permission flow' },
      { id: 'session-logging', name: 'Session Data Logging', status: 'pending', message: 'Verify session data in analytics' },
      { id: 'gig-persistence', name: 'Gig State Persistence', status: 'pending', message: 'Test gig state across app restarts' }
    ]
  },
  {
    id: 'payments-security',
    name: 'Payments & Security',
    icon: CreditCard,
    description: 'Test payment integration, security, and compliance',
    priority: 'critical',
    tests: [
      { id: 'stripe-connect', name: 'Stripe Connection', status: 'pending', message: 'Test Stripe account linking' },
      { id: 'paypal-connect', name: 'PayPal Connection', status: 'pending', message: 'Test PayPal account linking' },
      { id: 'venmo-connect', name: 'Venmo Connection', status: 'pending', message: 'Test Venmo account linking' },
      { id: 'cashapp-connect', name: 'CashApp Connection', status: 'pending', message: 'Test CashApp account linking' },
      { id: 'tip-routing', name: 'Tip Fund Routing', status: 'pending', message: 'Simulate fan tip → artist account' },
      { id: 'payment-notifications', name: 'Payment Notifications', status: 'pending', message: 'Test payment confirmation alerts' },
      { id: 'data-encryption', name: 'Payment Data Encryption', status: 'pending', message: 'Verify no unencrypted payment data storage' },
      { id: 'pci-compliance', name: 'PCI Compliance', status: 'pending', message: 'Verify PCI compliance standards' },
      { id: 'https-enforcement', name: 'HTTPS/TLS 1.2+ Enforcement', status: 'pending', message: 'Test secure connection requirements' }
    ]
  },
  {
    id: 'privacy-legal',
    name: 'Privacy & Legal',
    icon: Shield,
    description: 'Test privacy controls, legal compliance, and data handling',
    priority: 'high',
    tests: [
      { id: 'privacy-policy', name: 'Privacy Policy Links', status: 'pending', message: 'Verify privacy policy accessibility' },
      { id: 'terms-of-service', name: 'Terms of Service Links', status: 'pending', message: 'Verify ToS accessibility' },
      { id: 'att-prompt', name: 'App Tracking Transparency', status: 'pending', message: 'Test ATT prompt if tracking SDKs present' },
      { id: 'location-consent', name: 'Location Data Consent', status: 'pending', message: 'Test user consent before location storage' },
      { id: 'data-deletion', name: 'Data Deletion Rights', status: 'pending', message: 'Test user data deletion capabilities' },
      { id: 'privacy-controls', name: 'Privacy Controls', status: 'pending', message: 'Test notification and analytics toggles' }
    ]
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Validation',
    icon: Palette,
    description: 'Test design consistency, accessibility, and user experience',
    priority: 'high',
    tests: [
      { id: 'splash-screen', name: 'Splash Screen Loading', status: 'pending', message: 'Test clean splash screen display' },
      { id: 'onboarding-slides', name: 'Onboarding Slides', status: 'pending', message: 'Test "How It Works" slide presentation' },
      { id: 'cta-visibility', name: 'CTA Visibility', status: 'pending', message: 'Check CTAs visible on every page' },
      { id: 'dark-mode', name: 'Dark Mode Support', status: 'pending', message: 'Test dark mode rendering' },
      { id: 'typography', name: 'Inter Font Loading', status: 'pending', message: 'Verify Inter font loads correctly' },
      { id: 'responsive-design', name: 'Responsive Design', status: 'pending', message: 'Test layout across screen sizes' },
      { id: 'accessibility', name: 'Accessibility Standards', status: 'pending', message: 'Test WCAG compliance and screen readers' }
    ]
  },
  {
    id: 'analytics-tools',
    name: 'Analytics & Artist Tools',
    icon: BarChart3,
    description: 'Test dashboard functionality and artist tools',
    priority: 'medium',
    tests: [
      { id: 'realtime-tips', name: 'Real-time Tip Display', status: 'pending', message: 'Test live tip notifications' },
      { id: 'song-requests', name: 'Song Request Logging', status: 'pending', message: 'Test request capture and storage' },
      { id: 'analytics-dashboard', name: 'Analytics Dashboard', status: 'pending', message: 'Test tip analytics and insights' },
      { id: 'top-songs', name: 'Top Songs Analytics', status: 'pending', message: 'Test most requested songs tracking' },
      { id: 'peak-times', name: 'Peak Tip Times', status: 'pending', message: 'Test time-based tip analytics' },
      { id: 'repeat-supporters', name: 'Repeat Supporters', status: 'pending', message: 'Test supporter recognition features' },
      { id: 'marketing-materials', name: 'Marketing Materials', status: 'pending', message: 'Test QR code, poster, table tent downloads' }
    ]
  },
  {
    id: 'app-metadata',
    name: 'App Store Metadata',
    icon: Store,
    description: 'Test App Store compliance and metadata requirements',
    priority: 'high',
    tests: [
      { id: 'app-name', name: 'App Name: "Bandit"', status: 'pending', message: 'Verify app name is set correctly' },
      { id: 'app-subtitle', name: 'Subtitle: "Tip your favorite musicians"', status: 'pending', message: 'Verify app subtitle' },
      { id: 'app-description', name: 'App Description', status: 'pending', message: 'Verify brand copy matches requirements' },
      { id: 'screenshots', name: 'App Store Screenshots', status: 'pending', message: 'Test splash, onboarding, gig, tip, analytics screens' },
      { id: 'app-icon', name: 'App Icon Quality', status: 'pending', message: 'Verify icon crispness across sizes' },
      { id: 'app-logo', name: 'Logo Quality', status: 'pending', message: 'Verify logo quality in different contexts' }
    ]
  },
  {
    id: 'error-handling',
    name: 'Bug & Error Handling',
    icon: Bug,
    description: 'Test edge cases, error states, and recovery mechanisms',
    priority: 'high',
    tests: [
      { id: 'failed-payment', name: 'Failed Payment Handling', status: 'pending', message: 'Test payment failure error messages' },
      { id: 'bad-qr-scan', name: 'Bad QR Scan Fallback', status: 'pending', message: 'Test QR scan error handling' },
      { id: 'blank-screens', name: 'No Blank Screens', status: 'pending', message: 'Check for any blank/broken screens' },
      { id: 'broken-links', name: 'No Broken Links', status: 'pending', message: 'Test all navigation and external links' },
      { id: 'placeholder-text', name: 'No Placeholder Text', status: 'pending', message: 'Remove any placeholder/debug text' },
      { id: 'error-recovery', name: 'Error Recovery', status: 'pending', message: 'Test app recovery from error states' }
    ]
  },
  {
    id: 'compliance',
    name: 'Pre-Submission Compliance',
    icon: FileCheck,
    description: 'Final App Store submission requirements validation',
    priority: 'critical',
    tests: [
      { id: 'age-rating', name: 'Age Rating (12+)', status: 'pending', message: 'Verify age rating set correctly' },
      { id: 'payment-disclaimer', name: 'External Payment Disclaimer', status: 'pending', message: 'Verify payment disclaimer included' },
      { id: 'account-deletion-present', name: 'Account Deletion Present', status: 'pending', message: 'Confirm account deletion functionality exists' },
      { id: 'support-url', name: 'Valid Support URL', status: 'pending', message: 'Test support URL accessibility' },
      { id: 'privacy-url', name: 'Valid Privacy Policy URL', status: 'pending', message: 'Test privacy policy URL' },
      { id: 'app-store-guidelines', name: 'App Store Guidelines', status: 'pending', message: 'Review against App Store Review Guidelines' }
    ]
  }
];