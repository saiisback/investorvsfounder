'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface TransactionListProps {
  totalAmount?: string;
  month?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({
  totalAmount = "12,134.33",
  month = "May",
}) => {
  const { transactions } = useApp();

  // Calculate total for the current month
  const currentMonthTotal = transactions
    .filter((t) => t.type === 'sent')
    .reduce((sum, t) => sum + t.actualAmount, 0);

  const displayTransactions = transactions.length > 0 ? transactions : [
    {
      id: "1",
      name: "Mistral Team",
      amount: "- $2,500.00",
      date: "Today",
      time: "10:30",
      category: "Team Transfer",
      icon: "MT",
      iconBg: "bg-blue-600",
      type: 'sent' as const,
      actualAmount: 2500
    },
  ];
  return (
    <div className="px-6 py-4">
      {/* Transaction Overview Card */}
      <div className="bg-zinc-800 rounded-3xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[#FDFEFF] text-xl font-bold mb-1">Transaction</h2>
            <p className="text-[#9CA3AF] text-sm">Round: Seed Funding</p>
            <p className="text-[#C9F56A] text-xs mt-1">
              Total Sent: ${currentMonthTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* Mini Bar Chart */}
            <div className="flex items-end space-x-1">
              <div className="w-2 h-4 bg-[#2A2A2A] rounded-sm"></div>
              <div className="w-2 h-6 bg-[#2A2A2A] rounded-sm"></div>
              <div className="w-2 h-3 bg-[#2A2A2A] rounded-sm"></div>
              <div className="w-2 h-5 bg-[#2A2A2A] rounded-sm"></div>
              <div className="w-2 h-4 bg-[#C9F56A] rounded-sm"></div>
              <div className="w-2 h-7 bg-[#C9F56A] rounded-sm"></div>
              <div className="w-2 h-5 bg-[#C9F56A] rounded-sm"></div>
            </div>
            <ChevronRight size={20} className="text-[#9CA3AF]" />
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-2">
        {displayTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-zinc-800 rounded-3xl flex items-center justify-between overflow-hidden">
            {/* Left side - Icon and Details */}
            <div className="flex items-center">
              {/* Transaction Image - using pfp.png */}
              <div className={`${transaction.iconBg} w-16 h-16 rounded-3xl flex items-center justify-center overflow-hidden`}>
                <img src="/pfp.png" alt={transaction.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Transaction Details */}
              <div className="px-4">
                <h3 className="text-[#FDFEFF] font-medium text-base">
                  {transaction.name}
                </h3>
                <p className="text-[#9CA3AF] text-sm">
                  {transaction.date} {transaction.time}
                </p>
              </div>
            </div>

            {/* Right side - Amount and Category */}
            <div className="text-right pr-6">
              <p className={`font-medium text-base ${
                transaction.amount.startsWith('+') 
                  ? 'text-green-400' 
                  : transaction.amount.startsWith('-')
                  ? 'text-[#FDFEFF]'
                  : 'text-[#FDFEFF]'
              }`}>
                {transaction.amount}
              </p>
              <p className="text-[#9CA3AF] text-sm">
                {transaction.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;