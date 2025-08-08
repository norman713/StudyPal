import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import { useAuth } from "@/context/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};
export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, isLoading } = useAuth();
  const { signIn } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  // const handleGoogleLogin = async () => {
  // 		setLoading(true);
  // 		try {
  // 			const response = await GoogleLogin();
  // 			const { idToken, user } = response;

  // 			if (idToken) {
  // 				const resp = await authAPI.validateToken({
  // 					token: idToken,
  // 					email: user.email,
  // 				});
  // 				await handlePostLoginData(resp.data);
  // 			}
  // 		} catch (apiError) {
  // 			setError(
  // 				apiError?.response?.data?.error?.message || 'Something went wrong'
  // 			);
  // 		} finally {
  // 			setLoading(false);
  // 		}
  // 	};
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.containerSmall}>
        <TextInput placeholder={"Type your email"} />
        <TextInput placeholder="Enter your password" isPassword />
        <Link style={styles.link} href="/(authen)/forgot">
          Forgot password?
        </Link>
      </View>

      <View style={styles.containerSmall}>
        <CustomButton>Login</CustomButton>
        <View style={styles.divideContainer}>
          <View style={styles.divideLine}></View>
          <Text style={styles.option}>Or</Text>
          <View style={styles.divideLine}></View>
        </View>
        <CustomButton
          bgColor="#FFFFFF"
          textColor="#1E282DA6"
          fontFamily="Poppins_400Regular"
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: "white",
    gap: 30,
  },
  containerSmall: {
    width: "100%",
    gap: 10,
  },
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
  logiGGBtn: {
    backgroundColor: "#FFF",
  },
  divideLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#9E9E9E",
  },
  divideContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  option: {
    marginHorizontal: 10,
    color: "#9E9E9E",
    fontSize: 16,
  },
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
});
