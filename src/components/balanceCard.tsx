'use client';

import React, { useState } from 'react';
import { Send, Plus, Grid3X3, MoreHorizontal, QrCode } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import SendMoneyModal from './sendMoneyModal';

interface BalanceCardProps {
  accountLabel?: string;
  currency?: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  accountLabel = "Main account",
  currency = "$"
}) => {
  const { balance, equity, penalties } = useApp();
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const balanceStr = balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const [wholePart, decimalPart] = balanceStr.split('.');

  return (
    <>
      <div className="bg-[#C9F56A] rounded-3xl p-4 mx-6 my-4">
        {/* Account Label */}
        <div className="mb-4">
          <p className="text-[#8B9A3A] text-sm font-medium">
            {accountLabel}
          </p>
        </div>

        {/* Balance */}
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-[#12121B] text-2xl font-bold mr-1">
              {currency}
            </span>
            <span className="text-[#12121B] text-5xl font-bold leading-none">
              {wholePart}
            </span>
            <span className="text-[#12121B] text-2xl leading-none">
              .{decimalPart}
            </span>
          </div>
          {/* Additional Info */}
          <div className="mt-2 flex items-center space-x-4 text-xs text-[#8B9A3A]">
            <span>Equity: {currency}{equity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span>Penalties: {currency}{penalties.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {/* Send Button */}
          <button 
            onClick={() => setIsSendModalOpen(true)}
            className="flex-1 bg-[#12121B] text-[#FDFEFF] rounded-xl px-5 py-3 flex items-center justify-center space-x-2 hover:bg-[#2A2A2A] transition-colors"
          >
            <span className="font-medium">Send</span>
            <Send size={20} />
          </button>

          {/* Plus Button */}
          <button className="bg-[#12121B] text-[#FDFEFF] rounded-xl p-3 flex items-center justify-center hover:bg-[#2A2A2A] transition-colors">
            <Plus size={20} />
          </button>

          {/* QR Code Button */}
          <button className="bg-[#12121B] text-[#FDFEFF] rounded-xl p-3 flex items-center justify-center hover:bg-[#2A2A2A] transition-colors">
            <QrCode size={20} />
          </button>

          {/* More Button */}
          <button className="bg-[#12121B] text-[#FDFEFF] rounded-xl p-3 flex items-center justify-center hover:bg-[#2A2A2A] transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
      <SendMoneyModal isOpen={isSendModalOpen} onClose={() => setIsSendModalOpen(false)} />
    </>
  );
};

export default BalanceCard;