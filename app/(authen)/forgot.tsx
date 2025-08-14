import authApi from "@/api/authApi";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import { isValidEmail } from "@/util/validators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Loading from "../loading";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState({ title: "", description: "" });
  const handleSendCode = async () => {
    setShowError(false);
    setMessage({ title: "", description: "" });

    const emailTrim = email.trim();

    // 1) Validate input
    if (!emailTrim) {
      setShowError(true);
      setMessage({ title: "Error", description: "Please fill in email" });
      return;
    }
    if (!isValidEmail(emailTrim)) {
      setShowError(true);
      setMessage({ title: "Error", description: "Invalid email format." });
      return;
    }

    // 2) Call API
    setLoading(true);
    try {
      const res = await authApi.code("RESET_PASSWORD", emailTrim);
      console.log("Success", res.success);
      if (!res.success) {
        setShowError(true);
        setMessage({
          title: "Send code failed",
          description: res.message || "Failed to send reset code.",
        });
        return;
      }

      await AsyncStorage.setItem("resetEmail", emailTrim);

      router.push({
        pathname: "/(authen)/verify",
        params: { email: emailTrim },
      });
    } catch (err: any) {
      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to send reset code.";
      setShowError(true);
      setMessage({ title: "Send code failed", description: apiMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.view}>
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
          {showError && (
            <Text style={{ color: "red" }}>{message.description}</Text>
          )}
          <CustomButton onPress={handleSendCode}>Send code</CustomButton>
        </View>
      </SafeAreaView>
      {loading && (
        <View style={styles.overlay}>
          <Loading />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "flex-start",
  },
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 999,
  },
});
