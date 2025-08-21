import authApi from "@/api/authApi";
import CustomButton from "@/components/CustomButton";
import Message from "@/components/message/Message";
import TextInput from "@/components/TextInput";
import { useAuth } from "@/context/auth";
import { isValidEmail } from "@/util/validators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Loading from "../loading";

export default function Login() {
  const { user, isLoading } = useAuth();
  const { signIn } = useAuth();
  const [loginRequest, setLoginRequest] = useState({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  // const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    );
  }

  const handleLogin = async () => {
    // Reset error
    setShowError(false);
    setMessage({ title: "", description: "" });
    // 1. Validate local
    if (!loginRequest.email.trim() || !loginRequest.password.trim()) {
      setShowError(true);
      setMessage({
        title: "Login Error",
        description: "Please fill in both email and password.",
      });
      return;
    }
    // validate email type
    if (!isValidEmail(loginRequest.email.trim())) {
      setShowError(true);
      setMessage({
        title: "Error",
        description: "Invalid email format.",
      });
      return;
    }
    // call api
    setLoading(true);
    try {
      const { accessToken, refreshToken } = await authApi.login(
        loginRequest.email.trim(),
        loginRequest.password.trim()
      );

      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

      // login success then hide error
      setShowError(false);
      setMessage({ title: "", description: "" });

      router.push("/(me)/main");
    } catch (err: any) {
      // catch error
      const apiMessage =
        err?.response?.data?.message || "Email or password is incorrect.";
      setShowError(true);
      setMessage({
        title: "Login failed",
        description: apiMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.containerSmall}>
        <TextInput
          placeholder="Type your email"
          value={loginRequest.email}
          onChangeText={(text) =>
            setLoginRequest((prev) => ({ ...prev, email: text }))
          }
        />
        <TextInput
          placeholder="Enter your password"
          isPassword
          value={loginRequest.password}
          onChangeText={(text) =>
            setLoginRequest((prev) => ({ ...prev, password: text }))
          }
        />

        <Link style={styles.link} href="/(authen)/forgot">
          Forgot password?
        </Link>
      </View>

      <View style={styles.containerSmall}>
        {showError && (
          <Message
            visible={showError}
            type="error"
            title={message.title}
            description={message.description}
            onClose={() => setShowError(false)}
            onOkPress={() => setShowError(false)}
          />
        )}

        <CustomButton onPress={handleLogin}>Login</CustomButton>
        <View style={styles.divideContainer}>
          <View style={styles.divideLine} />
          <Text style={styles.option}>Or</Text>
          <View style={styles.divideLine} />
        </View>

        <CustomButton
          bgColor="#FFFFFF"
          textColor="#1E282DA6"
          fontFamily="Poppins_400Regular"
          onPress={signIn}
          icon={
            <Image
              source={require("@/assets/images/google-icon.png")}
              style={{ width: 30, height: 30 }}
            />
          }
        >
          Login with Google
        </CustomButton>
      </View>

      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Link style={styles.signUpLink} href="/(authen)/register">
          Sign up here
        </Link>
      </Text>
      {loading && (
        <View style={styles.overlay}>
          <Loading />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 165,
    paddingHorizontal: 25,
    backgroundColor: "white",
    gap: 30,
  },
  containerSmall: { width: "100%", gap: 10 },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 36,
    color: "#7AB2D3",
    textAlign: "center",
  },
  link: {
    textAlign: "right",
    color: "#7AB2D3",
    fontSize: 15,
    fontFamily: "Roboto_700Bold",
  },
  logiGGBtn: { backgroundColor: "#FFF" },
  divideLine: { flex: 1, height: 2, backgroundColor: "#9E9E9E" },
  divideContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  option: { marginHorizontal: 10, color: "#9E9E9E", fontSize: 16 },
  footerText: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 16,
  },
  signUpLink: {
    color: "#7AB2D3",
    fontFamily: "Roboto_700Bold",
    fontWeight: "bold",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 999,
  },
});
