import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { TTRansaction, TUserData } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateOverviewData(
  users: TUserData[],
  transactions: TTRansaction[]
) {
  const totalUsers = users.length;
  const totalAgents = users.filter((u) => u.role === 'agent').length;
  const transactionCount = transactions.length;
  const transactionVolume = transactions.reduce((sum, t) => sum + t.amount, 0);

  return {
    totalUsers,
    totalAgents,
    transactionCount,
    transactionVolume,
  };
}

export function generateTransactionTrends(transactions: TTRansaction[]) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const trendMap: Record<string, { transactions: number; volume: number }> = {};
  weekdays.forEach((day) => (trendMap[day] = { transactions: 0, volume: 0 }));

  transactions.forEach((t) => {
    const date = new Date(t.createdAt);
    const dayName = weekdays[date.getUTCDay()];
    trendMap[dayName].transactions += 1;
    trendMap[dayName].volume += t.amount;
  });

  return weekdays.map((day) => ({
    day,
    transactions: trendMap[day].transactions,
    volume: trendMap[day].volume,
  }));
}

export function generateUserDistribution(users: TUserData[]) {
  const total = users.length;

  const roleCounts: Record<string, number> = {};
  users.forEach((u) => {
    roleCounts[u.role] = (roleCounts[u.role] || 0) + 1;
  });

  return Object.entries(roleCounts).map(([role, count]) => ({
    type: role,
    count,
    percentage: parseFloat(((count / total) * 100).toFixed(1)),
  }));
}

export function generateDashboardData(
  users: TUserData[],
  transactions: TTRansaction[]
) {
  const overviewData = generateOverviewData(users, transactions);
  const transactionTrends = generateTransactionTrends(transactions);
  const userDistribution = generateUserDistribution(users);

  return { overviewData, transactionTrends, userDistribution };
}
