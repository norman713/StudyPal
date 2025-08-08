import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Register() {
  const handleSendCode = () => {
    router.push("/(authen)/verification");
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.containerSmall}>
        <View style={styles.top}>
          <Text style={styles.title}>Forgot password</Text>
          <Text style={styles.instruction}>
            Please enter the email linked with your account
          </Text>
        </View>

        <TextInput placeholder={"Enter your email"} />
        <CustomButton onPress={handleSendCode}>Send code</CustomButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    gap: 110,
  },
  containerSmall: {
    width: "100%",
    gap: 30,
  },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 36,
    textAlign: "center",
    color: "#7AB2D3",
  },
  top: {
    gap: 10,
  },
  instruction: {
    fontFamily: "Roboto_400Regular",
    color: "gray",
    textAlign: "center",
    fontSize: 16,
    width: "100%",
  },
});
