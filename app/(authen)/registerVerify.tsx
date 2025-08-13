import authApi from "@/api/authApi";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

function formatMMSS(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

type RouteParams = { email?: string };

export default function RegisterVerify() {
  const { email } = useLocalSearchParams<RouteParams>();
  const [code, setCode] = useState("");
  const [time, setTime] = useState(120);
  const [running, setRunning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // counter
  useEffect(() => {
    if (!running || time <= 0) return;
    const id = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [running, time]);

  const label = useMemo(() => formatMMSS(time), [time]);

  // handlers
  const handleVerify = async () => {
    if (!code.trim()) return setErr("Please enter the verification code");
    if (!email) return setErr("Missing email. Please register again.");

    setErr("");
    setLoading(true);
    try {
      await authApi.verifyRegister(email.trim(), code.trim());
      router.push("/(authen)/success");
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || !email.trim())
      return setErr("Missing email. Please register again.");

    setErr("");
    setLoading(true);
    try {
      await authApi.code("REGISTER", email.trim());
      setTime(60);
      setRunning(true);
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.containerSmall}>
        <View style={styles.top}>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.instruction}>
            Enter the verification code we just sent on your email address.
          </Text>
        </View>

        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder={"Enter verification code"}
        />

        <View>
          <Text style={styles.countdown}>{label}</Text>
          <CustomButton onPress={handleVerify}>Verify</CustomButton>
        </View>

        <Text style={styles.footerText}>
          Didn’t receive a code?{" "}
          <Text style={styles.verifyLink} onPress={handleResend}>
            Resend
          </Text>
        </Text>
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
    gap: 110,
  },
  containerSmall: {
    width: "100%",
    paddingHorizontal: 20,
    gap: 30,
  },
  top: {
    gap: 10,
  },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 36,
    textAlign: "center",
    color: "#7AB2D3",
  },
  instruction: {
    fontFamily: "Roboto_400Regular",
    color: "gray",
    textAlign: "left",
    fontSize: 15,
    width: "100%",
  },
  countdown: {
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 15,
  },
  footerText: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 16,
  },
  verifyLink: {
    color: "#7AB2D3",
    fontFamily: "Roboto_700Bold",
  },
});
