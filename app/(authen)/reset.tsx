import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
export default function Register() {
  const [selectedGender, setSelectedGender] = useState("Male");
  const [userInfo, setUserInfo] = useState<any>(null);
  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <View style={styles.top}>
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.instruction}>
            Enter a new password below to change your password
          </Text>
        </View>

        <View style={styles.containerSmall}>
          <TextInput placeholder="Enter new password" isPassword />
          <TextInput placeholder="Confirm password" isPassword />
        </View>

        <CustomButton onPress={() => router.push("/(authen)/success")}>
          Reset password
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
