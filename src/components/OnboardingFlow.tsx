import React, { useState } from 'react';
import { ChevronRight, Download, FileText, DollarSign, Music, Users, QrCode } from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from './AppContext';

const onboardingSteps = [
  {
    title: "Download the App",
    subtitle: "You're already here!",
    description: "Welcome to Bandit - the platform that helps musicians earn tips and connect with fans during live performances.",
    icon: Download,
    illustration: "musician-phone"
  },
  {
    title: "Request Free QR Materials",
    subtitle: "Get your gig essentials",
    description: "We'll send you posters, table tents, and digital assets to help fans find and tip you easily at your gigs.",
    icon: QrCode,
    illustration: "qr-materials"
  },
  {
    title: "Gig and Earn",
    subtitle: "Start making money",
    description: "Set up your gig, share your QR code, and watch the tips roll in as you perform. Your fans can tip and request songs instantly.",
    icon: DollarSign,
    illustration: "crowd-tips"
  }
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const { setCurrentScreen, setHasSeenOnboarding, isAuthenticated } = useApp();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setHasSeenOnboarding(true);
      setCurrentScreen(isAuthenticated ? 'home' : 'auth');
    }
  };

  const handleSkip = () => {
    setHasSeenOnboarding(true);
    setCurrentScreen(isAuthenticated ? 'home' : 'auth');
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex space-x-2">
          {onboardingSteps.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep 
                  ? 'bg-bandit-teal' 
                  : index < currentStep 
                    ? 'bg-bandit-gamboge'
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleSkip}
          className="text-gray-500"
        >
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Illustration */}
        <div className="mb-8 relative">
          {step.illustration === "musician-phone" && (
            <div className="bg-gradient-bandit rounded-3xl p-8 w-48 h-48 flex items-center justify-center">
              <div className="relative">
                <Music size={48} className="text-white mb-4" />
                <div className="bg-white rounded-lg p-2 absolute -bottom-2 -right-2">
                  <Download size={20} className="text-bandit-teal" />
                </div>
              </div>
            </div>
          )}
          
          {step.illustration === "qr-materials" && (
            <div className="bg-bandit-columbia-blue rounded-3xl p-8 w-48 h-48 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded p-3 flex items-center justify-center">
                  <QrCode size={24} className="text-bandit-teal" />
                </div>
                <div className="bg-white rounded p-3 flex items-center justify-center">
                  <FileText size={24} className="text-bandit-teal" />
                </div>
                <div className="bg-white rounded p-3 flex items-center justify-center col-span-2">
                  <QrCode size={32} className="text-bandit-teal" />
                </div>
              </div>
            </div>
          )}
          
          {step.illustration === "crowd-tips" && (
            <div className="bg-gradient-bandit-warm rounded-3xl p-8 w-48 h-48 flex items-center justify-center">
              <div className="relative">
                <Users size={40} className="text-white mb-2" />
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-full p-1 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                      <DollarSign size={12} className="text-bandit-teal" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Icon */}
        <div className="mb-4 bg-bandit-teal/10 rounded-full p-3">
          <Icon size={24} className="text-bandit-teal" />
        </div>

        {/* Text Content */}
        <h2 className="mb-2">{step.title}</h2>
        <p className="text-bandit-teal mb-4">{step.subtitle}</p>
        <p className="text-gray-600 leading-relaxed">{step.description}</p>
      </div>

      {/* Bottom CTA */}
      <div className="p-6">
        <Button 
          onClick={handleNext}
          size="lg"
          className="w-full bg-bandit-teal hover:bg-bandit-teal/90"
        >
          {currentStep === onboardingSteps.length - 1 ? "Let's Get Started" : "Next"}
          <ChevronRight size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}