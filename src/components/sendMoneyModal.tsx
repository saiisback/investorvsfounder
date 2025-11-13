'use client';

import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { useApp, Team } from '@/context/AppContext';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTeamId?: string | null;
}

const SendMoneyModal: React.FC<SendMoneyModalProps> = ({ isOpen, onClose, preselectedTeamId = null }) => {
  const { teams, balance, sendMoney } = useApp();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(
    preselectedTeamId ? teams.find(t => t.id === preselectedTeamId) || null : null
  );
  const [amount, setAmount] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Update selected team when preselectedTeamId changes
  useEffect(() => {
    if (preselectedTeamId && isOpen) {
      const team = teams.find(t => t.id === preselectedTeamId);
      if (team) {
        setSelectedTeam(team);
      }
    }
  }, [preselectedTeamId, isOpen, teams]);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!selectedTeam) {
      setError('Please select a team');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (amountNum > balance) {
      setError('Insufficient balance');
      return;
    }

    const success = sendMoney(selectedTeam.id, amountNum);
    if (success) {
      setAmount('');
      setSelectedTeam(null);
      setError('');
      onClose();
    } else {
      setError('Transaction failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
      <div className="bg-zinc-900 rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-[#FDFEFF] text-xl font-bold">Send Money</h2>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#FDFEFF] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF]" size={20} />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800 text-[#FDFEFF] rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9F56A]"
              />
            </div>
          </div>

          {/* Team Selection */}
          <div className="mb-6">
            <h3 className="text-[#FDFEFF] font-medium mb-3">Select Team</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => {
                    setSelectedTeam(team);
                    setError('');
                  }}
                  className={`w-full flex items-center p-4 rounded-xl transition-colors ${
                    selectedTeam?.id === team.id
                      ? 'bg-[#C9F56A] text-[#12121B]'
                      : 'bg-zinc-800 text-[#FDFEFF] hover:bg-zinc-700'
                  }`}
                >
                  <div className={`${team.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mr-3`}>
                    <span className="text-white font-bold text-sm">{team.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{team.name}</p>
                    <p className={`text-xs ${selectedTeam?.id === team.id ? 'text-[#12121B] opacity-70' : 'text-[#9CA3AF]'}`}>
                      {team.walletAddress}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <h3 className="text-[#FDFEFF] font-medium mb-3">Amount</h3>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] text-xl">$</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError('');
                }}
                className="w-full bg-zinc-800 text-[#FDFEFF] rounded-xl pl-8 pr-4 py-4 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-[#C9F56A]"
                step="0.01"
                min="0"
                max={balance}
              />
            </div>
            <p className="text-[#9CA3AF] text-sm mt-2">
              Available: ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800">
          <button
            onClick={handleSend}
            disabled={!selectedTeam || !amount || parseFloat(amount) <= 0}
            className="w-full bg-[#C9F56A] text-[#12121B] rounded-xl py-4 font-bold text-lg hover:bg-[#B8E55A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send ${amount || '0.00'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyModal;

