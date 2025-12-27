# iOS App Switcher-Style Wallet Stack - Design Documentation

## Overview
This implementation creates a premium, iOS App Switcher-inspired vertical wallet stack for a personal expense manager app. The design emphasizes smooth, fluid animations and gesture-based navigation optimized for mobile devices.

---

## 🎨 Design System

### Visual Hierarchy & Layout

#### **Stack Structure (Rolodex Style)**
The distinct characteristic of this design is the **Tight Overlap**. Unlike a standard list, cards are stacked with significant overlap, revealing only the colorful headers of neighbors.

```
┌─────────────────────────────┐
│ Header (My Wallets)         │
├─────────────────────────────┤
│   🎴 Previous Wallet        │  ◄─ Pushed UP & BEHIND
│      (Only header visible)  │     (Scale 0.9, Opacity 0.8)
│                             │
│   ╔═════════════════════╗   │
│   ║                     ║   │  ◄─ ACTIVE WALLET (Center)
│   ║   Main Wallet       ║   │     • On Top (Z-Index 100)
│   ║   $ 5,432.50        ║   │     • Separated from stack
│   ║                     ║   │     • Full Scale (1.05)
│   ╚═════════════════════╝   │
│                             │
│   🎴 Next Wallet            │  ◄─ Pushed DOWN & BEHIND
│      (Only header visible)  │     (Scale 0.9, Opacity 0.8)
│                             │
├─────────────────────────────┤
│ ●●●○● Indicator Dots        │
└─────────────────────────────┘
```

### Interaction Physics

1.  **Overlapping State (Default):**
    *   Spacing: `60px` (Cards are `220px` tall) → **160px overlap**
    *   This creates a dense, "physical deck" look.

2.  **Focus Separation (Active):**
    *   As a card approaches the center, the stack **splits**.
    *   Top neighbors are pushed up by `80px`.
    *   Bottom neighbors are pushed down by `80px`.
    *   This "clears the stage" for the active card.

3.  **Dynamic Layering (Z-Index):**
    *   Active Card: `z-index: 100` (Front)
    *   Neighbors: `z-index` decays rapidly (e.g., 90, 80...)
    *   Result: The active card floats *above* the rest of the deck.

4.  **Spring Snapping:**
    *   `damping: 15`, `stiffness: 120`: Snappy, tactile response.
    *   Cards snap firmly into the "Focused" slot.

---

## 💎 Premium Design Elements

### Glassmorphism Effect
- Semi-transparent white overlay (15% opacity)
- Blurred background through gradient
- Layered visual depth

### Micro-animations
- **Indicator dots**: Width animation (6px → 24px when active)
- **Background opacity**: Subtle pulse during scroll
- **Card shadows**: Dynamic elevation

### Typography
- **Balance**: 42px, bold, letter-spacing -1
- **Wallet name**: 20px, semi-bold
- **Labels**: 13px, medium weight
- All text includes shadows for depth

---

## 🛠 Technical Implementation

### Architecture

**Component Hierarchy:**
```
home.tsx (Screen)
  └─ GestureHandlerRootView
      └─ WalletStack (Container)
          ├─ Background (Animated)
          ├─ Header
          ├─ GestureDetector
          │   └─ Card Stack
          │       └─ WalletCard[] (Animated)
          ├─ Indicator Dots
          └─ Quick Actions
```

### Modern React Native Patterns

#### ✅ **Best Practices Used:**

1. **Reanimated v3 Worklets**
   - All animations run on UI thread (60 FPS)
   - Uses `useAnimatedStyle` for optimal performance
   - `SharedValue` for reactive state

2. **Gesture Handler v2**
   - New gesture composition API
   - `Gesture.Pan()` instead of deprecated PanGestureHandler
   - Proper event properties (`translationY`, not `changeY`)

3. **TypeScript**
   - Full type safety
   - Proper interface definitions
   - Type-safe wallet data

4. **Expo SDK 54**
   - `expo-linear-gradient` for gradients
   - `expo-blur` for glassmorphism (if needed)
   - Modern Expo modules

#### ⚠️ **What's Different from Older Tutorials:**

**OLD** (Deprecated):
```typescript
// ❌ Old Reanimated v1
import Animated from 'react-native-reanimated';
const scrollY = new Animated.Value(0);

// ❌ Old Gesture Handler v1
<PanGestureHandler onGestureEvent={...}>
event.nativeEvent.changeY  // Wrong property
```

**NEW** (Current):
```typescript
// ✅ Reanimated v3
import Animated, { useSharedValue, SharedValue } from 'react-native-reanimated';
const scrollY = useSharedValue(0);

// ✅ Gesture Handler v2
const gesture = Gesture.Pan()
  .onUpdate((event) => {
    event.translationY  // Correct property
  });
```

---

## 📱 User Experience Flow

### Initial Load
1. Screen opens with first wallet centered
2. Other wallets partially visible above/below
3. Header shows "1 of 5"

### Scrolling
1. User swipes up → Stack moves down (previous wallet comes into view)
2. User swipes down → Stack moves up (next wallet comes into view)
3. Release → Snaps to nearest wallet with spring animation
4. Indicator updates to show active wallet

### Visual Feedback
- **Active wallet**: Full size, full opacity, no rotation
- **Adjacent wallets**: Visible but smaller and faded
- **Smooth transitions**: Spring physics for natural feel
- **Haptic feedback**: Can be added using `expo-haptics`

---

## 🎓 Educational Notes

### Why This Approach?

1. **Performance**: Reanimated v3 runs animations on native thread
2. **Gesture Accuracy**: New Gesture Handler provides better tracking
3. **Type Safety**: TypeScript prevents runtime errors
4. **Scalability**: Component-based architecture is maintainable
5. **Modern**: Follows 2024+ React Native best practices

### Key Learning Points

- **Shared Values**: Reactive state that works across JS and native
- **Worklets**: JavaScript functions that run on UI thread
- **Spring Physics**: Creates natural, iOS-like animations
- **Gesture Composition**: Build complex gestures from simple ones
- **Interpolation**: Map scroll position to visual properties

---

## 🚀 Future Enhancements

### Possible Additions:

1. **Haptic Feedback**
   ```typescript
   import * as Haptics from 'expo-haptics';
   // On snap
   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
   ```

2. **Swipe to Delete**
   - Horizontal swipe on card
   - Reveal delete button
   - Confirmation animation

3. **Add Wallet Animation**
   - New card slides in from bottom
   - Existing cards shift up
   - Spring animation

4. **Transaction Quick View**
   - Tap card → Expand to show recent transactions
   - Collapse back to stack

5. **Dark/Light Mode**
   - Dynamic color schemes
   - System appearance integration

6. **Accessibility**
   - VoiceOver support
   - Alternative interaction methods
   - Color contrast improvements

---

## 📦 Dependencies

```json
{
  "react-native-reanimated": "~4.1.1",     // Latest, with worklets
  "react-native-gesture-handler": "~2.28.0", // v2 API
  "expo-linear-gradient": "latest",         // Gradient backgrounds
  "expo-blur": "latest"                     // Glassmorphism (optional)
}
```

---

## 🎯 Summary

This implementation delivers a **premium, iOS-style wallet selection experience** with:
- ✅ Smooth 60 FPS animations
- ✅ Natural gesture interactions
- ✅ Modern React Native best practices
- ✅ Beautiful glassmorphism design
- ✅ Type-safe, maintainable code

The vertical stack metaphor makes it intuitive to browse wallets, while the premium animations and visual design create a delightful user experience that feels native to iOS.
