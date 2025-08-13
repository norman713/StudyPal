import authApi from "@/api/authApi";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !pass || !confirm) {
      return setErr("Please fill all fields");
    }
    if (pass !== confirm) {
      return setErr("Passwords do not match");
    }

    setErr("");
    setLoading(true);
    try {
      await authApi.register(name.trim(), email.trim(), pass);
      router.push({
        pathname: "/(authen)/registerVerify",
        params: { email: email.trim(), name: name.trim() },
      });
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <View style={styles.contentAbove}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.containerSmall}>
            <TextInput
              placeholder="Enter your username"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Enter your password"
              isPassword
              value={pass}
              onChangeText={setPass}
            />
            <TextInput
              placeholder="Retype your password"
              isPassword
              value={confirm}
              onChangeText={setConfirm}
            />
            {!!err && <Text style={{ color: "red" }}>{err}</Text>}
          </View>
        </View>

        <CustomButton onPress={loading ? undefined : handleRegister}>
          {loading ? "Validating..." : "Continue"}
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
    gap: 80,
    paddingHorizontal: 20,
  },
  contentAbove: {
    gap: 40,
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
