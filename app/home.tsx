// app/home.tsx

import WalletStack from '@/components/WalletStack';
import { SAMPLE_WALLETS, Wallet } from '@/types/wallet';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [selectedWallet, setSelectedWallet] = useState<Wallet>(SAMPLE_WALLETS[0]);

  const handleWalletSelect = (wallet: Wallet) => {
    setSelectedWallet(wallet);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <WalletStack wallets={SAMPLE_WALLETS} onWalletSelect={handleWalletSelect} />
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  safeArea: {
    flex: 1,
  },
});
