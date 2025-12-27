// components/WalletCard.tsx

import { Wallet } from '@/types/wallet';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const CARD_WIDTH = SCREEN_WIDTH - 40; // 20px padding on each side
export const CARD_HEIGHT = 200;

interface WalletCardProps {
  wallet: Wallet;
}

export default function WalletCard({ wallet }: WalletCardProps) {
  const getWalletIcon = () => {
    const icons: Record<Wallet['type'], string> = {
      cash: '💵',
      bank: '🏦',
      credit: '💳',
      savings: '🏛️',
    };
    return icons[wallet.type];
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: wallet.currency,
      minimumFractionDigits: 2,
    }).format(balance);
  };

  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={[wallet.color, wallet.colorEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Glassmorphism overlay */}
        <View style={styles.glassOverlay}>
          {/* Top section - Wallet Info */}
          <View style={styles.topRow}>
            <View style={styles.walletInfo}>
              <Text style={styles.walletIcon}>{getWalletIcon()}</Text>
              <View style={styles.walletDetails}>
                <Text style={styles.walletName}>{wallet.name}</Text>
                <Text style={styles.walletType}>{wallet.type.toUpperCase()}</Text>
              </View>
            </View>
            {/* Chip */}
            <View style={styles.chipContainer}>
              <View style={styles.chip} />
            </View>
          </View>

          {/* Balance Section */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>{formatBalance(wallet.balance)}</Text>
          </View>

          {/* Bottom section - Card Number */}
          <View style={styles.bottomRow}>
            {wallet.cardNumber ? (
              <Text style={styles.cardNumber}>•••• •••• •••• {wallet.cardNumber}</Text>
            ) : (
              <Text style={styles.cardNumber}>WALLET</Text>
            )}
          </View>
        </View>

        {/* Decorative circles */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    // Elevation for Android
    elevation: 15,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  glassOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    padding: 20,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  walletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  walletDetails: {
    justifyContent: 'center',
  },
  walletName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  walletType: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  chipContainer: {
    width: 45,
    height: 32,
  },
  chip: {
    width: 45,
    height: 32,
    backgroundColor: 'rgba(255, 215, 0, 0.7)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  balanceContainer: {
    alignItems: 'flex-start',
  },
  balanceLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  cardNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 2,
  },
  // Decorative background circles
  circle1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: -50,
    right: -30,
  },
  circle2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    bottom: -30,
    left: -20,
  },
});
