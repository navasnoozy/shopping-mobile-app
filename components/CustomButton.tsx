import { Pressable, StyleSheet, ViewStyle,Text } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function CustomButton({ title, onPress, style }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 15,
    width: "80%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
