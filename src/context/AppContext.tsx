'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export interface Transaction {
  id: string;
  name: string;
  amount: string;
  date: string;
  time: string;
  category: string;
  icon: string;
  iconBg: string;
  type: 'sent' | 'received';
  actualAmount: number;
}

export interface Team {
  id: string;
  name: string;
  walletAddress: string;
  icon: string;
  iconBg: string;
}

interface AppContextType {
  balance: number;
  equity: number;
  penalties: number;
  transactions: Transaction[];
  teams: Team[];
  sendMoney: (toTeamId: string, amount: number) => boolean;
  receiveMoney: (fromTeamId: string, amount: number) => void;
  applyDecay: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_BALANCE = 112933.42;
const INITIAL_TEAMS: Team[] = [
  { id: '1', name: 'Mistral Team', walletAddress: '0x123...', icon: 'MT', iconBg: 'bg-blue-600' },
  { id: '2', name: 'Dragon Team', walletAddress: '0x456...', icon: 'DT', iconBg: 'bg-purple-600' },
  { id: '3', name: 'Phoenix Team', walletAddress: '0x789...', icon: 'PT', iconBg: 'bg-green-600' },
  { id: '4', name: 'Lynx Team', walletAddress: '0xabc...', icon: 'LT', iconBg: 'bg-red-600' },
  { id: '5', name: 'Tiger Team', walletAddress: '0xdef...', icon: 'TT', iconBg: 'bg-orange-600' },
  { id: '6', name: 'Eagle Team', walletAddress: '0xghi...', icon: 'ET', iconBg: 'bg-yellow-600' },
  { id: '7', name: 'Wolf Team', walletAddress: '0xjkl...', icon: 'WT', iconBg: 'bg-indigo-600' },
  { id: '8', name: 'Bear Team', walletAddress: '0xmno...', icon: 'BT', iconBg: 'bg-pink-600' },
  { id: '9', name: 'Shark Team', walletAddress: '0xpqr...', icon: 'ST', iconBg: 'bg-cyan-600' },
  { id: '10', name: 'Lion Team', walletAddress: '0xstu...', icon: 'LT', iconBg: 'bg-amber-600' },
  { id: '11', name: 'Falcon Team', walletAddress: '0xvwx...', icon: 'FT', iconBg: 'bg-emerald-600' },
  { id: '12', name: 'Hawk Team', walletAddress: '0xyza...', icon: 'HT', iconBg: 'bg-violet-600' },
  { id: '13', name: 'Panther Team', walletAddress: '0xbcd...', icon: 'PT', iconBg: 'bg-rose-600' },
  { id: '14', name: 'Cobra Team', walletAddress: '0xefg...', icon: 'CT', iconBg: 'bg-teal-600' },
  { id: '15', name: 'Rhino Team', walletAddress: '0xhij...', icon: 'RT', iconBg: 'bg-lime-600' },
  { id: '16', name: 'Jaguar Team', walletAddress: '0xklm...', icon: 'JT', iconBg: 'bg-sky-600' },
  { id: '17', name: 'Leopard Team', walletAddress: '0xnop...', icon: 'LT', iconBg: 'bg-fuchsia-600' },
  { id: '18', name: 'Cheetah Team', walletAddress: '0xqrs...', icon: 'CT', iconBg: 'bg-amber-600' },
  { id: '19', name: 'Raven Team', walletAddress: '0xtuv...', icon: 'RT', iconBg: 'bg-slate-600' },
  { id: '20', name: 'Viper Team', walletAddress: '0xwxy...', icon: 'VT', iconBg: 'bg-red-700' },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
  const [equity, setEquity] = useState<number>(INITIAL_BALANCE);
  const [penalties, setPenalties] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const balanceRef = useRef<number>(INITIAL_BALANCE);

  // Keep ref in sync with state
  useEffect(() => {
    balanceRef.current = balance;
  }, [balance]);

  const formatDate = (date: Date): { date: string; time: string } => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    let dateStr = '';
    if (diffMins < 1) dateStr = 'Just now';
    else if (diffMins < 60) dateStr = `${diffMins} min ago`;
    else if (diffHours < 24) dateStr = diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    else if (diffDays === 1) dateStr = 'Yesterday';
    else if (diffDays < 7) dateStr = `${diffDays} days ago`;
    else dateStr = `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;

    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    return { date: dateStr, time: timeStr };
  };

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date' | 'time'>) => {
    const now = new Date();
    const { date, time } = formatDate(now);
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date,
      time,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  }, []);

  const sendMoney = useCallback((toTeamId: string, amount: number): boolean => {
    if (amount <= 0) return false;

    const team = INITIAL_TEAMS.find((t) => t.id === toTeamId);
    if (!team) return false;

    const currentBalance = balanceRef.current;
    if (amount > currentBalance) {
      return false; // Insufficient balance
    }

    setBalance((prev) => prev - amount);
    setEquity((prev) => prev - amount);

    addTransaction({
      name: team.name,
      amount: `- $${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      category: 'Team Transfer',
      icon: team.icon,
      iconBg: team.iconBg,
      type: 'sent',
      actualAmount: amount,
    });

    return true;
  }, [addTransaction]);

  const receiveMoney = useCallback((fromTeamId: string, amount: number) => {
    const team = INITIAL_TEAMS.find((t) => t.id === fromTeamId);
    if (!team) return;

    setBalance((prev) => prev + amount);
    setEquity((prev) => prev + amount);

    addTransaction({
      name: team.name,
      amount: `+ $${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      category: 'Team Transfer',
      icon: team.icon,
      iconBg: team.iconBg,
      type: 'received',
      actualAmount: amount,
    });
  }, [addTransaction]);

  const applyDecay = useCallback(() => {
    setBalance((currentBalance) => {
      if (currentBalance <= 0) return currentBalance;

      const decayAmount = currentBalance * 0.05;
      const newBalance = currentBalance - decayAmount;

      setEquity(newBalance);
      setPenalties((prev) => prev + decayAmount);

      addTransaction({
        name: 'Decay Mechanism',
        amount: `- $${decayAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        category: 'Decay Penalty',
        icon: 'DC',
        iconBg: 'bg-red-800',
        type: 'sent',
        actualAmount: decayAmount,
      });

      return newBalance;
    });
  }, [addTransaction]);

  // Decay mechanism: Apply 5% reduction every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      applyDecay();
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, [applyDecay]);

  // Simulate random incoming transactions
  useEffect(() => {
    const randomReceiveInterval = setInterval(() => {
      const randomTeam = INITIAL_TEAMS[Math.floor(Math.random() * INITIAL_TEAMS.length)];
      const randomAmount = Math.random() * 5000 + 500; // Between $500 and $5500
      receiveMoney(randomTeam.id, randomAmount);
    }, 30000 + Math.random() * 60000); // Every 30-90 seconds

    return () => clearInterval(randomReceiveInterval);
  }, [receiveMoney]);

  return (
    <AppContext.Provider
      value={{
        balance,
        equity,
        penalties,
        transactions,
        teams: INITIAL_TEAMS,
        sendMoney,
        receiveMoney,
        applyDecay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

