import React from 'react';
import { Send, Settings, MessageCircle, Grid3X3, MapMinus, MapPlus } from 'lucide-react';

interface FooterBarProps {
  activeTab?: 'main' | 'send' | 'settings' | 'messages';
}

const FooterBar: React.FC<FooterBarProps> = ({
  activeTab = 'main'
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-2">
      <div className="bg-white rounded-4xl p-2">
        <div className="flex items-center justify-between">
          {/* Main Button (Active) */}
          <button className={`flex items-center space-x-3 px-8 py-4 rounded-4xl transition-colors ${
            activeTab === 'main' 
              ? 'bg-zinc-900 text-white' 
              : 'text-zinc-600 hover:text-zinc-900'
          }`}>
               <span className="font-medium text-base">Main</span>
               <MapMinus size={24} />
         
          </button>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            {/* Send Icon (Inactive) */}
            <button className={`p-4 rounded-2xl transition-colors ${
              activeTab === 'send' 
                ? 'bg-zinc-900 text-white' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}>
              <Send size={24} />
            </button>

            {/* Settings Icon (Inactive) */}
            <button className={`p-4 rounded-2xl transition-colors ${
              activeTab === 'settings' 
                ? 'bg-zinc-900 text-white' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}>
              <Settings size={24} />
            </button>

            {/* Messages Icon (Inactive) */}
            <button className={`p-4 rounded-2xl transition-colors ${
              activeTab === 'messages' 
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