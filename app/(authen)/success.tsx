import CustomButton from "@/components/CustomButton";
import useCustomFonts from "@/hook/useCustomFont";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SuccessScreen() {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/Success icon.png")}
        style={styles.image}
      />
      <View>
        <Text style={styles.title}>Password changed!</Text>
        <Text style={styles.instruction}>
          Your password has changed successfully
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton onPress={() => router.push("/(authen)/login")}>
          Back to login
        </CustomButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 165,
    gap: 40,
    paddingHorizontal: 25,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 36,
    color: "#7AB2D3",
  },
  instruction: {
    color: "#1E282DA6",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
});
