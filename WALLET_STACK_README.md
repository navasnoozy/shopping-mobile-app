# iOS App Switcher-Style Wallet Stack

A premium, gesture-driven vertical wallet selector for React Native, inspired by the iOS App Switcher.

## 🚀 Quick Start

### Navigate to Home Screen

To see the wallet stack in action, navigate to the `/home` route in your app.

#### Option 1: Update app/index.tsx
Replace the welcome screen with a redirect to home:

```tsx
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/home" />;
}
```

#### Option 2: Manual Navigation
Add a button on your welcome screen:

```tsx
import { router } from 'expo-router';

<CustomButton 
  title="View Wallets" 
  onPress={() => router.push('/home')}
/>
```

### Testing

1. **Start the development server** (already running on port 8082)
2. **Open Expo Go** on your device and scan the QR code
3. **Navigate to /home** using one of the options above
4. **Swipe vertically** to switch between wallets

### Gesture Controls

- **Swipe Up**: View previous wallet (stack moves down)
- **Swipe Down**: View next wallet (stack moves up)
- **Release**: Auto-snaps to nearest wallet

## 📁 Project Structure

```
components/
  ├── WalletCard.tsx      # Individual wallet card with animations
  └── WalletStack.tsx     # Main stack container with gesture handling

app/
  └── home.tsx            # Home screen implementation

types/
  └── wallet.ts           # Wallet types and sample data
```

## 🎨 Customization

### Adding New Wallets

Edit `/types/wallet.ts`:

```typescript
export const SAMPLE_WALLETS: Wallet[] = [
  {
    id: '6',
    name: 'Your Wallet',
    balance: 1000.00,
    currency: 'USD',
    color: '#custom-color-start',
    colorEnd: '#custom-color-end',
    type: 'cash',
  },
  // ... existing wallets
];
```

### Adjusting Animation Physics

In `/components/WalletStack.tsx`, modify the spring config:

```typescript
scrollY.value = withSpring(targetPosition, {
  damping: 20,      // Higher = less bouncy
  stiffness: 90,    // Higher = faster animation
  mass: 0.8,        // Lower = lighter feel
});
```

### Customizing Card Appearance

In `/components/WalletCard.tsx`:
- **Card size**: Adjust `CARD_WIDTH` and `CARD_HEIGHT`
- **Spacing**: Modify `CARD_SPACING` in WalletStack.tsx
- **Effects**: Change scale, opacity, rotation interpolation ranges

## 🎓 Learning Resources

- See `DESIGN_DOCUMENTATION.md` for complete design rationale
- All code uses **Reanimated v3** and **Gesture Handler v2** latest APIs
- TypeScript throughout for type safety

## 🔧 Technologies

- **React Native 0.81.5**
- **Expo SDK 54**
- **React Native Reanimated 4.1** (UI thread animations)
- **React Native Gesture Handler 2.28** (Modern gesture API)
- **Expo Linear Gradient** (Premium gradients)
- **TypeScript** (Type safety)

## 📝 Notes

- All animations run at 60 FPS on the UI thread
- Gesture tracking uses modern `translationY` property
- Spring physics create natural iOS-like feel
- Glassmorphism effects for premium appearance

---

**Ready to customize?** Start by editing the sample wallets in `/types/wallet.ts` and explore the animation parameters!
