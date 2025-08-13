import authApi from "@/api/authApi";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

type RouteParams = { email?: string };

export default function Reset() {
  const { email } = useLocalSearchParams<RouteParams>();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // show error giống Forgot
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState({ title: "", description: "" });

  const handleReset = async () => {
    // reset error
    setShowError(false);
    setMessage({ title: "", description: "" });

    const emailTrim = (email || "").trim();
    const passTrim = password.trim();
    const confirmTrim = confirm.trim();

    // validate cơ bản
    if (!emailTrim) {
      setShowError(true);
      setMessage({
        title: "Error",
        description: "Missing email. Please verify again.",
      });
      return;
    }
    if (!passTrim) {
      setShowError(true);
      setMessage({ title: "Error", description: "Please enter new password" });
      return;
    }

    if (passTrim !== confirmTrim) {
      setShowError(true);
      setMessage({ title: "Error", description: "Passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.reset(emailTrim, passTrim);
      if (!res.success) {
        setShowError(true);
        setMessage({
          title: "Reset failed",
          description: res.message || "Failed to reset password.",
        });
        return;
      }

      router.push("/(authen)/success");
    } catch (e: any) {
      const apiMessage =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Failed to reset password.";
      setShowError(true);
      setMessage({ title: "Reset failed", description: apiMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <View className="top">
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.instruction}>
            Enter a new password below to change your password
          </Text>
        </View>

        <View style={styles.containerSmall}>
          <TextInput
            placeholder="Enter new password"
            isPassword
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="Confirm password"
            isPassword
            value={confirm}
            onChangeText={setConfirm}
          />
        </View>

        {/* Show error giống Forgot */}
        {showError && (
          <Text style={{ color: "red" }}>{message.description}</Text>
        )}

        <CustomButton
          onPress={loading ? undefined : handleReset}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset password"}
        </CustomButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 5,
    paddingVertical: 20,
    backgroundColor: "white",
    gap: 80,
    width: "100%",
  },
  content: {
    gap: 40,
    paddingHorizontal: 20,
  },
  top: {
    gap: 10,
  },
  instruction: {
    fontFamily: "Roboto_400Regular",
    color: "gray",
    textAlign: "left",
    fontSize: 16,
    width: "100%",
  },
  containerSmall: {
    gap: 20,
  },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 36,
    textAlign: "center",
    color: "#7AB2D3",
  },
});
