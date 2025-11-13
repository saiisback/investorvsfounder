'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Send, Settings, MessageCircle, Grid3X3, MapMinus, MapPlus } from 'lucide-react';

interface FooterBarProps {
  activeTab?: 'main' | 'send' | 'settings' | 'messages';
}

const FooterBar: React.FC<FooterBarProps> = ({
  activeTab
}) => {
  const pathname = usePathname();
  const currentTab = activeTab || (pathname === '/' ? 'main' : pathname === '/marketplace' ? 'send' : 'main');

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2">
      <div className="bg-white rounded-4xl p-2">
        <div className="flex items-center justify-between">
          {/* Main Button */}
          <Link href="/" className={`flex items-center space-x-3 px-8 py-4 rounded-4xl transition-colors ${
            currentTab === 'main' 
              ? 'bg-zinc-900 text-white' 
              : 'text-zinc-600 hover:text-zinc-900'
          }`}>
            <span className="font-medium text-base">Main</span>
            <MapMinus size={24} />
          </Link>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            {/* Marketplace/Send Icon */}
            <Link href="/marketplace" className={`p-4 rounded-2xl transition-colors ${
              currentTab === 'send' 
                ? 'bg-zinc-900 text-white' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}>
              <Send size={24} />
            </Link>

            {/* Settings Icon */}
            <button className={`p-4 rounded-2xl transition-colors ${
              currentTab === 'settings' 
                ? 'bg-zinc-900 text-white' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}>
              <Settings size={24} />
            </button>

            {/* Messages Icon */}
            <button className={`p-4 rounded-2xl transition-colors ${
              currentTab === 'messages' 
                ? 'bg-zinc-900 text-white' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}>
              <MessageCircle size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBar;