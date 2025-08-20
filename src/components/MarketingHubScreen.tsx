import React from 'react';
import { Download, Share2, Package, QrCode, FileText, Image, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

export function MarketingHubScreen() {
  const handleDownload = (type: string) => {
    toast.success(`${type} downloaded successfully!`);
  };

  const handleOrderKit = () => {
    toast.success('Print kit ordered! We\'ll send you an email with tracking info.');
  };

  const marketingMaterials = [
    {
      type: 'QR Poster',
      description: 'Large format poster for venue display',
      format: 'PDF (24" x 36")',
      icon: QrCode,
      color: 'text-bandit-teal bg-bandit-teal/10'
    },
    {
      type: 'Table Tent',
      description: 'Foldable tent for tables and counters',
      format: 'PDF (4" x 6")',
      icon: FileText,
      color: 'text-bandit-tangerine bg-bandit-tangerine/10'
    },
    {
      type: 'Social Media Kit',
      description: 'Instagram stories, posts, and Facebook covers',
      format: 'ZIP (PNG files)',
      icon: Image,
      color: 'text-bandit-gamboge bg-bandit-gamboge/10'
    },
    {
      type: 'Phone Wallpaper',
      description: 'QR code wallpaper for your lock screen',
      format: 'PNG (1080x1920)',
      icon: Smartphone,
      color: 'text-bandit-jonquil bg-bandit-jonquil/10'
    }
  ];

  return (
    <div className="h-full bg-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-bandit text-white px-6 pt-12 pb-6">
        <h1 className="mb-2">Marketing Hub</h1>
        <p className="text-white/80">
          Download materials to promote your tip link at gigs
        </p>
      </div>

      <div className="px-6 -mt-3 space-y-6">
        {/* Quick Note */}
        <Card className="shadow-lg border-bandit-teal/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-bandit-teal/10 rounded-full p-2 mt-1">
                <QrCode size={16} className="text-bandit-teal" />
              </div>
              <div>
                <p className="font-medium mb-1">No app required for fans!</p>
                <p className="text-sm text-gray-600">
                  Your audience can tip you by simply scanning the QR code with their phone's camera. 
                  No downloads, no account creation - just instant tipping.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Marketing Materials */}
        <div className="space-y-4">
          <h3>Download Materials</h3>
          {marketingMaterials.map((material) => {
            const Icon = material.icon;
            return (
              <Card key={material.type}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`rounded-full p-3 ${material.color}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{material.type}</p>
                        <p className="text-sm text-gray-600">{material.description}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {material.format}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(material.type)}
                      >
                        <Download size={16} className="mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Print Kit CTA */}
        <Card className="bg-gradient-bandit-warm text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Package size={20} className="mr-2" />
              Physical Print Kit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/90 mb-4">
              Get professionally printed posters, table tents, and stickers delivered to your door. 
              Perfect for regular performers!
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">5x QR Posters (24" x 36")</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">20x Table Tents</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">50x QR Stickers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Free shipping</span>
              </div>
            </div>
            <Button
              className="w-full bg-white text-bandit-teal hover:bg-white/90"
              onClick={handleOrderKit}
            >
              Order Print Kit - $29.99
            </Button>
          </CardContent>
        </Card>

        {/* Tips for Success */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for Success</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-bandit-teal rounded-full mt-2"></div>
                <p className="text-sm">Place QR codes where fans can easily see them - on stage, tables, or music stands</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-bandit-teal rounded-full mt-2"></div>
                <p className="text-sm">Mention your tip link during breaks: "Scan the QR code to tip or request songs!"</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-bandit-teal rounded-full mt-2"></div>
                <p className="text-sm">Share on social media before your gigs to let fans know they can support you</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-bandit-teal rounded-full mt-2"></div>
                <p className="text-sm">Thank fans who tip by name when you see the notifications - it encourages others!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}