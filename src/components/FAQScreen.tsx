import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Mail, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { useApp } from './AppContext';
import { FAQItem } from './FAQItem';
import { faqCategories, contactMethods } from './constants/faqData';
import { toast } from 'sonner';

export function FAQScreen() {
  const { setCurrentScreen } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleContact = (method: string) => {
    if (method === 'chat') {
      toast.info('Opening chat support...');
    } else if (method === 'email') {
      window.location.href = 'mailto:support@bandit.tips';
    }
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

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
          <h1>FAQ & Support</h1>
          <div className="w-8"></div>
        </div>
        <p className="text-white/80">Find answers or get in touch</p>
      </div>

      <div className="px-6 -mt-3 space-y-6 pb-6">
        {/* Search */}
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contactMethods.map((method) => {
              const Icon = method.icon === 'MessageCircle' ? MessageCircle : Mail;
              return (
                <Button
                  key={method.action}
                  variant="outline"
                  className="w-full h-auto p-4 justify-start"
                  onClick={() => handleContact(method.action)}
                >
                  <Icon size={20} className="mr-3 text-bandit-teal" />
                  <div className="text-left">
                    <p className="font-medium">{method.title}</p>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    {method.available && (
                      <p className="text-xs text-gray-500">{method.available}</p>
                    )}
                    {method.email && (
                      <p className="text-xs text-bandit-teal">{method.email}</p>
                    )}
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        {filteredCategories.map((category) => (
          <div key={category.title} className="space-y-3">
            <h3 className="px-2">{category.title}</h3>
            <div className="space-y-2">
              {category.items.map((item) => (
                <FAQItem
                  key={item.id}
                  id={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItems.includes(item.id)}
                  onToggle={toggleItem}
                />
              ))}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && searchTerm && (
          <Card>
            <CardContent className="p-8 text-center">
              <Search size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="font-medium text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-500 mb-4">
                Try different keywords or contact support for help
              </p>
              <Button 
                onClick={() => handleContact('chat')}
                className="bg-bandit-teal"
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}