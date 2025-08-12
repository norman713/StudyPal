import authApi from "@/api/authApi";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSendCode = async () => {
    const mail = email.trim();
    if (!mail) {
      setShowError(true);
      return;
    }

    setLoading(true);
    setShowError(false);
    try {
      await authApi.sendResetCode(mail);
      await AsyncStorage.setItem("resetEmail", mail);
      router.push({
        pathname: "/(authen)/verification",
        params: { email: mail },
      });
    } catch (err: any) {
      console.error(
        "Send reset code error:",
        err?.response?.data || err?.message || err
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
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

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
        {showError && <Text style={{ color: "red" }}>Email is required</Text>}

        <CustomButton onPress={loading ? undefined : handleSendCode}>
          {loading ? "Sending..." : "Send code"}
        </CustomButton>
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
