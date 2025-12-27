// types/wallet.ts

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
  color: string; // Gradient start color
  colorEnd: string; // Gradient end color
  icon?: string;
  cardNumber?: string; // Last 4 digits
  type: 'cash' | 'bank' | 'credit' | 'savings';
}

export const SAMPLE_WALLETS: Wallet[] = [
  {
    id: '1',
    name: 'Main Wallet',
    balance: 5432.50,
    currency: 'USD',
    color: '#667eea',
    colorEnd: '#764ba2',
    cardNumber: '4532',
    type: 'bank',
  },
  {
    id: '2',
    name: 'Savings',
    balance: 12890.00,
    currency: 'USD',
    color: '#f093fb',
    colorEnd: '#f5576c',
    cardNumber: '8901',
    type: 'savings',
  },
  {
    id: '3',
    name: 'Cash Wallet',
    balance: 850.25,
    currency: 'USD',
    color: '#4facfe',
    colorEnd: '#00f2fe',
    type: 'cash',
  },
  {
    id: '4',
    name: 'Credit Card',
    balance: 3200.75,
    currency: 'USD',
    color: '#43e97b',
    colorEnd: '#38f9d7',
    cardNumber: '2356',
    type: 'credit',
  },
  {
    id: '5',
    name: 'Travel Fund',
    balance: 6750.00,
    currency: 'USD',
    color: '#fa709a',
    colorEnd: '#fee140',
    cardNumber: '7789',
    type: 'savings',
  },
];
