export const faqCategories = [
  {
    title: 'Getting Started',
    items: [
      {
        id: 'setup',
        question: 'How do I set up my Bandit account?',
        answer: 'Download the app, create your account, connect your payment method (Stripe, Venmo, etc.), and you\'re ready to start earning tips at your gigs!'
      },
      {
        id: 'first-gig',
        question: 'How do I start my first gig?',
        answer: 'Tap "Start Gig" on your home screen, choose your location (GPS or manual), add gig details, and go live! Your QR code will be ready for fans to scan.'
      },
      {
        id: 'qr-code',
        question: 'How do fans use my QR code?',
        answer: 'Fans simply scan your QR code with their phone\'s camera - no app download required! They can tip instantly and request songs directly from their browser.'
      }
    ]
  },
  {
    title: 'Payment & Tips',
    items: [
      {
        id: 'payment-setup',
        question: 'How do I connect my payment methods?',
        answer: 'Go to Profile > Payment Settings. You can connect Stripe for card payments, or add your Venmo, Cash App, or PayPal details for alternative payment options.'
      },
      {
        id: 'when-paid',
        question: 'When do I get paid?',
        answer: 'Stripe payments are processed weekly and deposited to your bank account. Alternative payments (Venmo, Cash App) go directly to those accounts instantly.'
      },
      {
        id: 'fees',
        question: 'What fees does Bandit charge?',
        answer: 'Bandit takes no fees! You only pay standard payment processing fees: Stripe charges 2.9% + $0.30 per transaction. Alternative payment methods have their own fee structures.'
      },
      {
        id: 'minimum-payout',
        question: 'Is there a minimum payout amount?',
        answer: 'No minimum payout for Stripe - even $1 tips are processed. Alternative payment methods depend on the service (Venmo, Cash App, etc.).'
      }
    ]
  },
  {
    title: 'Live Gigs',
    items: [
      {
        id: 'gig-visibility',
        question: 'How do fans find my gig?',
        answer: 'Share your QR code or tip link on social media, display QR posters at your venue, or use table tents. Fans can also discover nearby performances through location.'
      },
      {
        id: 'requests',
        question: 'How do song requests work?',
        answer: 'Fans can request songs when they tip or separately. You\'ll see requests in real-time and can pin favorites, mark as done, or refund if needed.'
      },
      {
        id: 'end-gig',
        question: 'What happens when I end a gig?',
        answer: 'Your QR code stops accepting new tips, and you\'ll see a summary of your earnings, tips, and requests. All data is saved in your Past Gigs section.'
      }
    ]
  },
  {
    title: 'Account & Safety',
    items: [
      {
        id: 'account-security',
        question: 'Is my payment information secure?',
        answer: 'Yes! We use industry-standard encryption and are PCI compliant. Bandit never stores your payment details - everything is handled by certified payment processors.'
      },
      {
        id: 'inappropriate-tips',
        question: 'What if I receive inappropriate messages?',
        answer: 'You can report any inappropriate content through the app. We have zero tolerance for harassment and will take immediate action to protect artists.'
      },
      {
        id: 'identity-verification',
        question: 'Do I need to verify my identity?',
        answer: 'For Stripe payments, you\'ll need to complete identity verification to receive payouts. This is required by law for tax reporting and fraud prevention.'
      }
    ]
  }
];

export const contactMethods = [
  {
    icon: 'MessageCircle',
    title: 'Live Chat',
    description: 'Chat with our support team',
    action: 'chat',
    available: 'Mon-Fri 9AM-6PM PST'
  },
  {
    icon: 'Mail',
    title: 'Email Support',
    description: 'Send us a detailed message',
    action: 'email',
    email: 'support@bandit.tips'
  }
];