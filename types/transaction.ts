// types/transaction.ts

export interface Transaction {
  id: string;
  walletId: string;
  title: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  icon: string;
}

// Sample transactions for each wallet
export const SAMPLE_TRANSACTIONS: Transaction[] = [
  // Main Wallet (id: 1) transactions
  {
    id: 't1',
    walletId: '1',
    title: 'Salary',
    description: 'Monthly salary',
    amount: 4500.00,
    type: 'income',
    category: 'income',
    date: '2024-12-24',
    icon: '💼',
  },
  {
    id: 't2',
    walletId: '1',
    title: 'Grocery Store',
    description: 'Weekly groceries',
    amount: -125.50,
    type: 'expense',
    category: 'food',
    date: '2024-12-23',
    icon: '🛒',
  },
  {
    id: 't3',
    walletId: '1',
    title: 'Netflix',
    description: 'Monthly subscription',
    amount: -15.99,
    type: 'expense',
    category: 'entertainment',
    date: '2024-12-22',
    icon: '🎬',
  },
  {
    id: 't4',
    walletId: '1',
    title: 'Coffee Shop',
    description: 'Morning coffee',
    amount: -5.50,
    type: 'expense',
    category: 'food',
    date: '2024-12-21',
    icon: '☕',
  },
  
  // Savings (id: 2) transactions
  {
    id: 't5',
    walletId: '2',
    title: 'Transfer In',
    description: 'Monthly savings',
    amount: 1000.00,
    type: 'income',
    category: 'transfer',
    date: '2024-12-20',
    icon: '💰',
  },
  {
    id: 't6',
    walletId: '2',
    title: 'Interest',
    description: 'Savings interest',
    amount: 45.00,
    type: 'income',
    category: 'income',
    date: '2024-12-15',
    icon: '📈',
  },
  {
    id: 't7',
    walletId: '2',
    title: 'Emergency Fund',
    description: 'Added to emergency',
    amount: 500.00,
    type: 'income',
    category: 'transfer',
    date: '2024-12-10',
    icon: '🏦',
  },
  
  // Cash Wallet (id: 3) transactions
  {
    id: 't8',
    walletId: '3',
    title: 'ATM Withdrawal',
    description: 'Cash withdrawal',
    amount: 200.00,
    type: 'income',
    category: 'transfer',
    date: '2024-12-24',
    icon: '🏧',
  },
  {
    id: 't9',
    walletId: '3',
    title: 'Taxi',
    description: 'Uber ride',
    amount: -25.00,
    type: 'expense',
    category: 'transport',
    date: '2024-12-23',
    icon: '🚕',
  },
  {
    id: 't10',
    walletId: '3',
    title: 'Street Food',
    description: 'Lunch',
    amount: -12.00,
    type: 'expense',
    category: 'food',
    date: '2024-12-22',
    icon: '🌮',
  },
  
  // Credit Card (id: 4) transactions
  {
    id: 't11',
    walletId: '4',
    title: 'Amazon',
    description: 'Electronics purchase',
    amount: -299.99,
    type: 'expense',
    category: 'shopping',
    date: '2024-12-24',
    icon: '📦',
  },
  {
    id: 't12',
    walletId: '4',
    title: 'Gas Station',
    description: 'Fuel',
    amount: -65.00,
    type: 'expense',
    category: 'transport',
    date: '2024-12-22',
    icon: '⛽',
  },
  {
    id: 't13',
    walletId: '4',
    title: 'Restaurant',
    description: 'Dinner with family',
    amount: -85.50,
    type: 'expense',
    category: 'food',
    date: '2024-12-20',
    icon: '🍽️',
  },
  {
    id: 't14',
    walletId: '4',
    title: 'Spotify',
    description: 'Music subscription',
    amount: -9.99,
    type: 'expense',
    category: 'entertainment',
    date: '2024-12-18',
    icon: '🎵',
  },
  
  // Travel Fund (id: 5) transactions
  {
    id: 't15',
    walletId: '5',
    title: 'Vacation Savings',
    description: 'Monthly contribution',
    amount: 500.00,
    type: 'income',
    category: 'transfer',
    date: '2024-12-20',
    icon: '✈️',
  },
  {
    id: 't16',
    walletId: '5',
    title: 'Hotel Booking',
    description: 'Summer trip deposit',
    amount: -350.00,
    type: 'expense',
    category: 'travel',
    date: '2024-12-15',
    icon: '🏨',
  },
  {
    id: 't17',
    walletId: '5',
    title: 'Flight Tickets',
    description: 'Round trip booking',
    amount: -650.00,
    type: 'expense',
    category: 'travel',
    date: '2024-12-10',
    icon: '🛫',
  },
];

// Helper function to get transactions by wallet
export const getTransactionsByWallet = (walletId: string): Transaction[] => {
  return SAMPLE_TRANSACTIONS.filter(t => t.walletId === walletId);
};
