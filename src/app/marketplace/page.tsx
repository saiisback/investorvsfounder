'use client';

import React, { useState } from 'react';
import { Search, QrCode } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import SendMoneyModal from '@/components/sendMoneyModal';

export default function MarketplacePage() {
  const { teams } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeamId(teamId);
    setIsSendModalOpen(true);
  };

  return (
    <>
      <div className="px-6 py-4 pb-24">
        <h1 className="text-[#FDFEFF] text-2xl font-bold mb-6">Marketplace</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9CA3AF]" size={20} />
            <input
              type="text"
              placeholder="Search teams or wallet addresses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800 text-[#FDFEFF] rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9F56A]"
            />
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="bg-zinc-800 rounded-3xl p-4 flex items-center justify-between hover:bg-zinc-700 transition-colors cursor-pointer"
              onClick={() => handleTeamSelect(team.id)}
            >
              <div className="flex items-center flex-1">
                <div className={`${team.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mr-4`}>
                  <span className="text-white font-bold text-lg">{team.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[#FDFEFF] font-medium text-lg mb-1">{team.name}</h3>
                  <p className="text-[#9CA3AF] text-sm font-mono">{team.walletAddress}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTeamSelect(team.id);
                  }}
                  className="bg-[#C9F56A] text-[#12121B] rounded-xl px-4 py-2 font-medium hover:bg-[#B8E55A] transition-colors"
                >
                  Send
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // QR Code functionality can be added here
                  }}
                  className="bg-zinc-700 text-[#FDFEFF] rounded-xl p-2 hover:bg-zinc-600 transition-colors"
                >
                  <QrCode size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#9CA3AF] text-lg">No teams found</p>
          </div>
        )}
      </div>

      <SendMoneyModal
        isOpen={isSendModalOpen}
        onClose={() => {
          setIsSendModalOpen(false);
          setSelectedTeamId(null);
        }}
        preselectedTeamId={selectedTeamId}
      />
    </>
  );
}

