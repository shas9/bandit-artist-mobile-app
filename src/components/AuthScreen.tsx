import React, { useState } from 'react';
import { Eye, EyeOff, Mail, User, Lock, AlertCircle, Shield, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import { useApp } from './AppContext';
import { toast } from 'sonner';

export function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setIsAuthenticated, setCurrentScreen, trackEvent } = useApp();

  // Password validation
  const passwordRequirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'Contains uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'Contains lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'Contains number', test: (pwd: string) => /\d/.test(pwd) }
  ];

  const isPasswordValid = passwordRequirements.every(req => req.test(password));
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    if (!isEmailValid) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!isLogin && !name.trim()) {
      setError('Please enter your artist name');
      return false;
    }
    
    if (!isLogin && !isPasswordValid) {
      setError('Password does not meet security requirements');
      return false;
    }
    
    if (!isLogin && !acceptedTerms) {
      setError('Please accept the Terms of Service');
      return false;
    }
    
    if (!isLogin && !acceptedPrivacy) {
      setError('Please accept the Privacy Policy');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    trackEvent(isLogin ? 'auth_login_attempt' : 'auth_signup_attempt');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication success
      setIsAuthenticated(true);
      setCurrentScreen('home');
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      
      trackEvent(isLogin ? 'auth_login_success' : 'auth_signup_success');
    } catch (err) {
      setError('Authentication failed. Please try again.');
      trackEvent(isLogin ? 'auth_login_error' : 'auth_signup_error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider: string) => {
    trackEvent('auth_social_attempt', { provider });
    setIsLoading(true);
    
    // Mock social authentication
    setTimeout(() => {
      setIsAuthenticated(true);
      setCurrentScreen('home');
      toast.success(`Welcome! Signed in with ${provider}`);
      trackEvent('auth_social_success', { provider });
      setIsLoading(false);
    }, 1000);
  };

  const handlePasswordReset = () => {
    if (!email) {
      toast.error('Please enter your email address first');
      return;
    }
    
    trackEvent('password_reset_requested', { email });
    toast.success('Password reset link sent to your email');
  };

  return (
    <div className="h-full bg-background flex flex-col justify-center px-6 overflow-y-auto">
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-gradient-bandit rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">B</span>
        </div>
        <h1 className="text-2xl font-bold text-bandit-teal mb-2">Welcome to Bandit</h1>
        <p className="text-gray-600">
          {isLogin ? 'Sign in to your account' : 'Create your artist account'}
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center">{isLogin ? 'Sign In' : 'Sign Up'}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle size={16} />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Artist Name</Label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-3 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your stage name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 focus:ring-2 focus:ring-bandit-teal/20"
                    required={!isLogin}
                    maxLength={50}
                  />
                </div>
                <p className="text-xs text-gray-500">This will be displayed to your fans</p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-3 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={`pl-10 focus:ring-2 focus:ring-bandit-teal/20 ${
                    email && !isEmailValid ? 'border-red-300' : ''
                  }`}
                  required
                />
                {email && isEmailValid && (
                  <CheckCircle size={16} className="absolute right-3 top-3.5 text-green-500" />
                )}
              </div>
              {email && !isEmailValid && (
                <p className="text-xs text-red-600">Please enter a valid email address</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="pl-10 pr-10 focus:ring-2 focus:ring-bandit-teal/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {!isLogin && password && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs font-medium text-gray-700">Password Requirements:</p>
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-xs">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        req.test(password) ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className={req.test(password) ? 'text-green-600' : 'text-gray-500'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={setAcceptedTerms}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{' '}
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-bandit-teal underline"
                      onClick={() => window.open('https://bandit-app.com/terms', '_blank')}
                    >
                      Terms of Service
                    </Button>
                  </Label>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={acceptedPrivacy}
                    onCheckedChange={setAcceptedPrivacy}
                    className="mt-1"
                  />
                  <Label htmlFor="privacy" className="text-sm leading-relaxed">
                    I acknowledge that I have read the{' '}
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-bandit-teal underline"
                      onClick={() => window.open('https://bandit-app.com/privacy', '_blank')}
                    >
                      Privacy Policy
                    </Button>
                  </Label>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="text-right">
                <Button 
                  type="button"
                  variant="link" 
                  size="sm" 
                  className="p-0 text-bandit-teal"
                  onClick={handlePasswordReset}
                >
                  Forgot password?
                </Button>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-bandit-teal hover:bg-bandit-teal/90 min-h-11"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full min-h-11 focus:ring-2 focus:ring-bandit-teal/20"
                onClick={() => handleSocialAuth('Google')}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full min-h-11 focus:ring-2 focus:ring-bandit-teal/20"
                onClick={() => handleSocialAuth('Apple')}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Continue with Apple
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button
                type="button"
                variant="link"
                size="sm"
                className="p-0 ml-1 text-bandit-teal"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setPassword('');
                  setAcceptedTerms(false);
                  setAcceptedPrivacy(false);
                }}
                disabled={isLoading}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Button>
            </p>
          </div>
          
          {!isLogin && (
            <Alert className="mt-4 bg-blue-50 border-blue-200">
              <Shield size={16} className="text-blue-600" />
              <AlertDescription className="text-blue-800 text-sm">
                <strong>Security Notice:</strong> Your account will be protected with industry-standard 
                encryption. We never store payment information and comply with all privacy regulations.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-xs text-gray-500 pb-6">
        <p>Protected by reCAPTCHA and subject to the Google</p>
        <p>
          <Button variant="link" size="sm" className="p-0 h-auto text-xs text-gray-500 underline">
            Privacy Policy
          </Button>
          {' '}and{' '}
          <Button variant="link" size="sm" className="p-0 h-auto text-xs text-gray-500 underline">
            Terms of Service
          </Button>
        </p>
      </div>
    </div>
  );
}