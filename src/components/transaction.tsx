import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Transaction {
  id: string;
  name: string;
  amount: string;
  date: string;
  time: string;
  category: string;
  icon: string;
  iconBg: string;
}

interface TransactionListProps {
  totalAmount?: string;
  month?: string;
  transactions?: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({
  totalAmount = "12,134.33",
  month = "May",
  transactions = [
    {
      id: "1",
      name: "Mistral  Team",
      amount: "- $2,500.00",
      date: "Today",
      time: "10:30",
      category: "Team Transfer",
      icon: "DT",
      iconBg: "bg-blue-600"
    },
    {
      id: "2", 
      name: "Dragon Team",
      amount: "- $1,800.00",
      date: "Yesterday",
      time: "14:20",
      category: "Team Transfer",
      icon: "DS",
      iconBg: "bg-purple-600"
    },
    {
      id: "3",
      name: "Phoenix Team",
      amount: "- $3,200.00",
      date: "2 days ago",
      time: "11:45",
      category: "Team Transfer",
      icon: "MT",
      iconBg: "bg-green-600"
    },
    {
      id: "4",
      name: "Lynx Team",
      amount: "- $4,100.00",
      date: "3 days ago",
      time: "09:15",
      category: "Team Transfer",
      icon: "ST",
      iconBg: "bg-red-600"
    },
    {
      id: "5",
      name: "Phoenix Team",
      amount: "- $1,200.00",
      date: "1 week ago",
      time: "16:00",
      category: "Team Transfer",
      icon: "PP",
      iconBg: "bg-orange-600"
    },
    {
      id: "6",
      name: "Dragon Team",
      amount: "- $2,750.00",
      date: "1 week ago",
      time: "13:30",


      category: "Team Transfer",
      icon: "DT",
      iconBg: "bg-purple-600"
    }
  ]
}) => {
  return (
    <div className="px-6 py-4">
      {/* Transaction Overview Card */}
      <div className="bg-zinc-800 rounded-3xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[#FDFEFF] text-xl font-bold mb-1">Transaction</h2>
            <p className="text-[#9CA3AF] text-sm">Round: Seed Funding</p>
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
        {transactions.map((transaction) => (
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
              <p className="text-[#FDFEFF] font-medium text-base">
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