//app/index.tsx

import logo from "@/assets/images/logo2-Photoroom.png";
import welcomeImage from "@/assets/images/welcome.jpeg";
import CustomButton from "@/components/CustomButton"; // Import your new component
import { Image, ImageBackground, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  return (
    <ImageBackground blurRadius={Platform.OS === "ios" ? 1 : 0.8} style={styles.imageContainer} source={welcomeImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBox}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.heading}>
            <Text style={styles.millionsText}>MILLIONS</Text>
            <Text style={styles.clubText}>CLUB</Text>
          </Text>
        </View>

        <View style={styles.bottomBox}>
          {/* Now we use the reusable component */}
          <CustomButton title="Signin" onPress={() => console.log("Signin Clicked")} />

          <CustomButton title="Signup" onPress={() => console.log("Signup Clicked")} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  topBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3330300b",
    borderRadius: 20,
    margin: 50,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 10.65,
        spreadDistance: 0,
        color: "#1f1e1e25", // Hex with opacity
      },
    ],
  },
  bottomBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    height: 150,
    width: 150,
    shadowColor: "#1f1e1eff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  heading: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 20,
    color: "#000",
  },
  millionsText: {
    fontWeight: "bold",
    color: "#37460bff",
  },
  clubText: {
    fontWeight: "normal",
    color: "#ff0000",
  },
});
