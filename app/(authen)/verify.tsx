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

export default function Verify() {
  const { email } = useLocalSearchParams<RouteParams>();
  const [code, setCode] = useState("");
  const [time, setTime] = useState(300);
  const [running, setRunning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState({ title: "", description: "" });

  // counter
  useEffect(() => {
    if (!running || time <= 0) return;
    const id = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [running, time]);

  const label = useMemo(() => formatMMSS(time), [time]);

  // handlers
  const handleVerify = async () => {
    setShowError(false);
    setMessage({ title: "", description: "" });

    // validate
    const codeTrim = code.trim();
    const emailTrim = (email || "").trim();

    if (!codeTrim) {
      setShowError(true);
      setMessage({
        title: "Error",
        description: "Please enter the verification code",
      });
      return;
    }
    if (!emailTrim) {
      setShowError(true);
      setMessage({
        title: "Error",
        description: "Missing email. Please register again.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.verifyReset(emailTrim, codeTrim);
      if (!res.success) {
        setShowError(true);
        setMessage({
          title: "Verification failed",
          description: res.message || "Verification failed",
        });
        return;
      }

      router.push({
        pathname: "/(authen)/reset",
        params: { email: emailTrim },
      });
    } catch (e: any) {
      const apiMessage =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Verification failed";
      setShowError(true);
      setMessage({ title: "Verification failed", description: apiMessage });
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    // reset error
    setShowError(false);
    setMessage({ title: "", description: "" });

    const emailTrim = (email || "").trim();
    if (!emailTrim) {
      setShowError(true);
      setMessage({
        title: "Error",
        description: "Missing email. Please register again.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.code("RESET_PASSWORD", emailTrim);

      if (!res.success) {
        setShowError(true);
        setMessage({
          title: "Resend failed",
          description: res.message || "Failed to resend code",
        });
        return;
      }

      setTime(300);
      setRunning(true);
    } catch (e: any) {
      const apiMessage =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Failed to resend code";
      setShowError(true);
      setMessage({ title: "Resend failed", description: apiMessage });
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
        {showError && (
          <Text style={{ color: "red" }}>{message.description}</Text>
        )}

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
