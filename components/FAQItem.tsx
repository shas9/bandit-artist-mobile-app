import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Card, CardContent } from './ui/card';

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export function FAQItem({ id, question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={() => onToggle(id)}>
        <CollapsibleTrigger asChild>
          <CardContent className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <p className="font-medium text-left">{question}</p>
              {isOpen ? (
                <ChevronDown size={20} className="text-bandit-teal" />
              ) : (
                <ChevronRight size={20} className="text-gray-400" />
              )}
            </div>
          </CardContent>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 px-4 pb-4">
            <p className="text-gray-600 leading-relaxed">{answer}</p>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}