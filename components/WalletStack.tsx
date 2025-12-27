// components/WalletStack.tsx

import { getTransactionsByWallet } from '@/types/transaction';
import { Wallet } from '@/types/wallet';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import WalletCard, { CARD_HEIGHT } from './WalletCard';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Layout constants
const CARD_VISIBLE_OFFSET = 50;
const STACK_TOP_PADDING = 16;
const STACK_AREA_HEIGHT = CARD_HEIGHT + 50;
const MAX_RECENT_TRANSACTIONS = 3; // Show only 3 recent transactions on home

interface WalletStackProps {
  wallets: Wallet[];
  onWalletSelect?: (wallet: Wallet) => void;
}

export default function WalletStack({ wallets, onWalletSelect }: WalletStackProps) {
  const scrollY = useSharedValue(0);
  const startScrollY = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Get recent transactions for the active wallet (limited)
  const activeWallet = wallets[activeIndex];
  const recentTransactions = useMemo(() => {
    const all = getTransactionsByWallet(activeWallet?.id || '');
    return all.slice(0, MAX_RECENT_TRANSACTIONS);
  }, [activeIndex, activeWallet?.id]);

  const updateActiveIndex = (index: number) => {
    setActiveIndex(index);
    if (onWalletSelect && wallets[index]) {
      onWalletSelect(wallets[index]);
    }
  };

  // Navigate to transactions page
  const handleCardTap = (wallet: Wallet, isActive: boolean) => {
    if (isActive) {
      // Navigate to transactions page with wallet ID
      router.push({
        pathname: '/transactions',
        params: { walletId: wallet.id, walletName: wallet.name }
      });
    }
  };

  // Pan gesture handler
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startScrollY.value = scrollY.value;
    })
    .onUpdate((event) => {
      const newValue = startScrollY.value - event.translationY;
      const minScroll = -20;
      const maxScroll = (wallets.length - 1) * CARD_VISIBLE_OFFSET + 20;
      scrollY.value = Math.max(minScroll, Math.min(newValue, maxScroll));
    })
    .onEnd((event) => {
      const velocity = -event.velocityY;
      let targetIndex = Math.round(scrollY.value / CARD_VISIBLE_OFFSET);
      
      if (Math.abs(velocity) > 600) {
        targetIndex += velocity > 0 ? 1 : -1;
      }
      
      targetIndex = Math.max(0, Math.min(targetIndex, wallets.length - 1));
      
      scrollY.value = withSpring(targetIndex * CARD_VISIBLE_OFFSET, {
        damping: 18,
        stiffness: 140,
        mass: 0.6,
        velocity: velocity / 400,
      });

      runOnJS(updateActiveIndex)(targetIndex);
    });

  // Format amount for display
  const formatAmount = (amount: number) => {
    const prefix = amount >= 0 ? '+' : '';
    return `${prefix}$${Math.abs(amount).toFixed(2)}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wallets</Text>
        <Text style={styles.walletCount}>{activeIndex + 1}/{wallets.length}</Text>
      </View>

      {/* Card Stack Area */}
      <View style={styles.stackAreaWrapper}>
        <GestureDetector gesture={panGesture}>
          <View style={styles.stackArea}>
            {wallets.map((wallet, index) => {
              const animatedCardStyle = useAnimatedStyle(() => {
                const activePosition = scrollY.value / CARD_VISIBLE_OFFSET;
                const distance = index - activePosition;
                
                const baseY = STACK_TOP_PADDING + (distance * CARD_VISIBLE_OFFSET);
                
                const scale = interpolate(
                  Math.abs(distance),
                  [0, 1, 2],
                  [1, 0.95, 0.9],
                  Extrapolation.CLAMP
                );
                
                const opacity = interpolate(
                  distance,
                  [-2, -1, 0, 1, 2],
                  [0, 0.3, 1, 0.6, 0.3],
                  Extrapolation.CLAMP
                );
                
                const zIndex = 100 - Math.abs(Math.round(distance * 10));

                return {
                  position: 'absolute' as const,
                  top: 0,
                  left: 20,
                  right: 20,
                  zIndex,
                  opacity,
                  transform: [
                    { translateY: baseY },
                    { scale },
                  ],
                };
              });

              const isActive = index === activeIndex;

              return (
                <Animated.View key={wallet.id} style={animatedCardStyle}>
                  <Pressable 
                    onPress={() => handleCardTap(wallet, isActive)}
                    style={({ pressed }) => [
                      { opacity: pressed && isActive ? 0.9 : 1 }
                    ]}
                  >
                    <WalletCard wallet={wallet} />
                    {/* Tap hint for active card */}
                    {isActive && (
                      <View style={styles.tapHint}>
                        <Text style={styles.tapHintText}>Tap for details</Text>
                      </View>
                    )}
                  </Pressable>
                </Animated.View>
              );
            })}
          </View>
        </GestureDetector>
        
        {/* Bottom fade gradient */}
        <LinearGradient
          colors={['transparent', '#0D0D0D']}
          style={styles.bottomFade}
          pointerEvents="none"
        />
      </View>

      {/* Recent Transactions Preview */}
      <View style={styles.recentSection}>
        <View style={styles.pullHandle} />
        
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Recent Activity</Text>
          <Pressable 
            onPress={() => router.push({
              pathname: '/transactions',
              params: { walletId: activeWallet?.id, walletName: activeWallet?.name }
            })}
          >
            <Text style={styles.seeAllText}>See All →</Text>
          </Pressable>
        </View>

        {recentTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No transactions yet</Text>
          </View>
        ) : (
          <View style={styles.transactionsList}>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.iconText}>{transaction.icon}</Text>
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDesc}>{transaction.description}</Text>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  transaction.amount >= 0 ? styles.income : styles.expense
                ]}>
                  {formatAmount(transaction.amount)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  walletCount: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '600',
  },
  stackAreaWrapper: {
    height: STACK_AREA_HEIGHT,
    position: 'relative',
  },
  stackArea: {
    flex: 1,
    overflow: 'hidden',
  },
  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 150,
  },
  tapHint: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tapHintText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
  },
  // Recent transactions section
  recentSection: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    zIndex: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  pullHandle: {
    width: 36,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  transactionsList: {
    // gap not used - using marginBottom on items for Android compatibility
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  transactionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  transactionDesc: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  income: {
    color: '#4ADE80',
  },
  expense: {
    color: '#FF6B6B',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});
