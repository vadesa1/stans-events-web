import { Smartphone, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export const DownloadAppBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDownload = () => {
    window.open('https://apps.apple.com/stans-events', '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Smartphone className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">
            Get the full experience! Download our app for exclusive features.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleDownload}
            className="whitespace-nowrap"
          >
            Download App
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsVisible(false)}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
